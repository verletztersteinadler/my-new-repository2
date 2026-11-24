#!/usr/bin/env node
/**
 * Catalog image provenance gate.
 *
 * Inventory is generated from source WITHOUT treating a source URL mentioned in
 * engineering copy as evidence that a photograph is genuine. All legacy images
 * are unverified until a separate manifest explicitly approves exact series IDs.
 *
 * Usage: node scripts/image-audit.mjs [--root DIR] [--report DIR]
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDefault = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ID = /^[a-z0-9][a-z0-9_-]*\/[a-z0-9][a-z0-9_-]*$/;
const VERIFIED = new Set(["official-model", "official-series", "official-generic"]);
const PERMISSIONS = new Set(["permission-granted", "licensed", "public-domain"]);
const TYPES = new Set(["website", "pdf", "catalog"]);
const VERIFIED_PATH = /^\/catalog\/verified\/[a-z0-9/_-]+\.(jpe?g|png|webp|avif)$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

export function inspectManifest(root, manifest) {
  const errors = [];
  const records = manifest?.records;
  if (!isRecord(records)) return ["image-manifest.json: records must be an object"];
  for (const [key, record] of Object.entries(records)) {
    if (!ID.test(key)) errors.push(key + ": key must be manufacturerSlug/seriesId");
    if (!isRecord(record)) { errors.push(key + ": metadata missing"); continue; }
    if (record.status === "placeholder") {
      if (record.imagePath !== null) errors.push(key + ": placeholder cannot reference an image");
      continue;
    }
    if (!VERIFIED.has(record.status)) {
      errors.push(key + ": unverified/rejected assets cannot be published");
      continue;
    }
    if (typeof record.imagePath !== "string" || !VERIFIED_PATH.test(record.imagePath)) {
      errors.push(key + ": verified image must be local in /catalog/verified/");
    } else if (!existsSync(join(root, "public", record.imagePath.slice(1)))) {
      errors.push(key + ": image file does not exist: " + record.imagePath);
    }
    if (typeof record.sourceUrl !== "string" || !/^https:\/\/[^\s/]+\//i.test(record.sourceUrl)) {
      errors.push(key + ": official source URL required");
    }
    if (!TYPES.has(record.sourceType)) errors.push(key + ": source type required");
    if (typeof record.verifiedAt !== "string" || !DATE.test(record.verifiedAt) ||
        !Number.isFinite(Date.parse(record.verifiedAt)) ||
        record.verifiedAt > new Date().toISOString().slice(0, 10)) {
      errors.push(key + ": invalid verification date");
    }
    if (!PERMISSIONS.has(record.usagePermission)) errors.push(key + ": reuse permission evidence required");
    if (record.sourceType === "pdf" && (!Number.isInteger(record.sourcePage) || record.sourcePage < 1)) {
      errors.push(key + ": PDF source page required");
    }
  }
  return errors;
}

export function inventorySourceFiles(root) {
  const dataDir = join(root, "src/data");
  const entries = readdirSync(dataDir).filter((f) => f.endsWith(".ts") && f !== "image-evidence.ts");
  const occurrences = [];
  for (const name of entries) {
    const body = readFileSync(join(dataDir, name), "utf8");
    // Matches literal strings only; inferred parameters in shared helper
    // functions are intentionally not treated as verified evidence.
    const re = /(?:\bimage\s*:\s*|\b(?:image|steamImg|fire|solid|cabinet|airImg)\s*=\s*)["'](\/catalog\/[^"']+)["']/g;
    for (const m of body.matchAll(re)) {
      const line = body.slice(0, m.index).split("\n").length;
      occurrences.push({ file: "src/data/" + name, line, imagePath: m[1], status: "unverified" });
    }
    const helper = /\brow\(\s*["'][^"']+["']\s*,\s*["'][^"']+["']\s*,\s*["'][^"']+["']\s*,\s*["'](\/catalog\/[^"']+)["']/g;
    for (const m of body.matchAll(helper)) {
      const line = body.slice(0, m.index).split("\n").length;
      occurrences.push({ file: "src/data/" + name, line, imagePath: m[1], status: "unverified" });
    }
  }
  return occurrences;
}

export function auditProject(root) {
  const manifestPath = join(root, "src/data/image-manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const errors = inspectManifest(root, manifest);
  const component = readFileSync(join(root, "src/components/catalog-page.tsx"), "utf8");
  const resolver = readFileSync(join(root, "src/data/image-evidence.ts"), "utf8");
  const imageComponent = readFileSync(join(root, "src/components/series-image.tsx"), "utf8");
  if (/src=\{(?:row\.)?series\.image\}/.test(component)) errors.push("catalog-page: legacy unverified series image published directly");
  if (!component.includes("SeriesImage")) errors.push("catalog-page: audited image component not connected");
  if (!resolver.includes('manifest.records')) errors.push("image-evidence: manifest is not enforced");
  if (!resolver.includes('IMAGE_PLACEHOLDER')) errors.push("image-evidence: neutral fallback missing");
  if (!imageComponent.includes("resolveSeriesImage")) errors.push("series-image: provenance resolver missing");
  if (!existsSync(join(root, "public/catalog/placeholders/no-verified-image.svg"))) {
    errors.push("image placeholder SVG missing");
  }
  if (/Взято с оф\. сайта производителя\./.test(component)) {
    errors.push("catalog-page: misleading blanket official-source attribution");
  }
  const sources = inventorySourceFiles(root);
  const references = new Map();
  for (const item of sources) {
    if (!references.has(item.imagePath)) references.set(item.imagePath, new Set());
    references.get(item.imagePath).add(item.file);
    if (!existsSync(join(root, "public", item.imagePath.slice(1)))) {
      errors.push(item.file + ":" + item.line + ": missing legacy image " + item.imagePath);
    }
  }
  // Record collisions as review targets, not as grounds to publish images.
  const repeated = [...references].filter(([, files]) => files.size > 1).map(([imagePath, files]) => ({ imagePath, files: [...files].sort() }));
  const approved = Object.entries(manifest.records || {}).filter(([, rec]) => VERIFIED.has(rec.status)).length;
  return { errors, summary: {
    legacyImageReferences: sources.length,
    uniqueLegacyFiles: references.size,
    repeatedAcrossSourceFiles: repeated.length,
    approvedImageRecords: approved,
    placeholderRecords: Object.values(manifest.records || {}).filter((r) => r.status === "placeholder").length,
    defaultUnverifiedPolicy: "placeholder",
  }, sources, repeated, records: manifest.records };
}

const escapeCsv = (v) => '"' + String(v ?? "").replaceAll('"', '""') + '"';
function main() {
  const flag = process.argv.indexOf("--root");
  const root = flag === -1 ? rootDefault : resolve(process.argv[flag + 1]);
  const reportFlag = process.argv.indexOf("--report");
  const report = reportFlag === -1 ? null : resolve(process.argv[reportFlag + 1]);
  const out = auditProject(root);
  if (report) {
    mkdirSync(report, { recursive: true });
    writeFileSync(join(report, "image-audit.json"), JSON.stringify(out, null, 2) + "\n");
    writeFileSync(join(report, "image-inventory.csv"), [
      ["file", "line", "imagePath", "status"].map(escapeCsv).join(","),
      ...out.sources.map((x) => [x.file, x.line, x.imagePath, x.status].map(escapeCsv).join(",")),
    ].join("\n") + "\n");
  }
  console.log("image-audit:", JSON.stringify(out.summary));
  if (out.errors.length) {
    for (const error of out.errors) console.error("image-audit: ERROR", error);
    process.exitCode = 1;
  } else console.log("image-audit: ok (unverified photos are hidden by default)");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
