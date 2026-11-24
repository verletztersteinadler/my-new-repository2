#!/usr/bin/env node
/**
 * Audit EVERY published manufacturer's series without guessing names.
 * Bundles only data modules through esbuild (already required by Vite) to
 * load the actual runtime registry, including dynamically constructed fills.
 *
 * Generates reports/catalog/series-name-audit.json and .csv.
 * Missing brand prefixes in SOURCE are warnings because the UI normalizes
 * presentation; empty titles or malformed formatter output block CI.
 */
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(process.cwd());
const reportDir = resolve(root, "reports/catalog");
const entry = `
export { publishedCatalogs } from "./src/data/series-index.ts";
export { displaySeriesName } from "./src/lib/series-names.ts";
`;
const result = await build({
  stdin: { contents: entry, resolveDir: root, sourcefile: "series-audit-entry.ts", loader: "ts" },
  bundle: true, platform: "node", format: "esm", write: false, logLevel: "silent",
  tsconfig: join(root, "tsconfig.json"),
});
const code = result.outputFiles[0]?.text;
if (!code) throw new Error("Unable to evaluate the published series registry");
const { publishedCatalogs, displaySeriesName } = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);
const issues = [];
const errors = [];
const entries = [];
const count = { catalogs: publishedCatalogs.length, series: 0, canonicalSource: 0, normalizedSource: 0, reversedBrandSource: 0, makerOnlySource: 0, duplicates: 0, empty: 0 };
for (const catalog of publishedCatalogs) {
  const brand = catalog.title.trim().replace(/\s+/g, " ");
  const brandFolded = brand.toLocaleLowerCase("ru");
  const used = new Map();
  for (const series of catalog.series) {
    count.series++;
    const raw = String(series.name ?? "").trim().replace(/\s+/g, " ");
    const display = displaySeriesName(brand, raw);
    const normalized = display.toLocaleLowerCase("ru");
    let status = "canonical";
    if (!raw) {
      status = "empty";
      count.empty++;
      errors.push(catalog.slug + "/" + series.id + ": empty name");
    } else if (raw.toLocaleLowerCase("ru") === brandFolded) {
      status = "maker-only";
      count.makerOnlySource++;
    } else if (display !== raw) {
      status = display.includes(" — ") ? "brand-reversed" : "missing-brand";
      if (status === "brand-reversed") count.reversedBrandSource++;
      else count.normalizedSource++;
    } else count.canonicalSource++;

    if (!normalized.startsWith(brandFolded) ||
        (normalized.length > brandFolded.length && !/[\s,;:()\u2013\u2014/-]/u.test(normalized[brandFolded.length]))) {
      errors.push(catalog.slug + "/" + series.id + ": formatter did not retain manufacturer prefix");
    }
    if (used.has(normalized)) {
      status = "duplicate-display-name";
      count.duplicates++;
      issues.push({ kind: status, manufacturerSlug: catalog.slug, brand, seriesId: series.id, raw, display, collidesWith: used.get(normalized) });
    } else used.set(normalized, series.id);
    if (status !== "canonical" && status !== "duplicate-display-name") {
      issues.push({ kind: status, manufacturerSlug: catalog.slug, brand, seriesId: series.id, raw, display });
    }
    entries.push({ manufacturerSlug: catalog.slug, brand, seriesId: series.id, sourceName: raw, displayName: display, status });
  }
}
mkdirSync(reportDir, { recursive: true });
const output = {
  generatedAt: new Date().toISOString(), rules: "Canonical display = manufacturer + exact series name, without duplicate prefixes. Source labels are retained except verified LAVART corrections.",
  totals: count, errors, reviewRequired: issues, entries,
};
writeFileSync(join(reportDir, "series-name-audit.json"), JSON.stringify(output, null, 2) + "\n");
const csv = (v) => '"' + String(v ?? "").replaceAll('"', '""') + '"';
writeFileSync(join(reportDir, "series-name-audit.csv"), [
  ["manufacturerSlug", "brand", "seriesId", "sourceName", "displayName", "status"].map(csv).join(","),
  ...entries.map((e) => [e.manufacturerSlug, e.brand, e.seriesId, e.sourceName, e.displayName, e.status].map(csv).join(",")),
].join("\n") + "\n");
console.log("series-name-audit:", JSON.stringify(count));
console.log("series-name-audit: flagged source records", issues.length);
for (const issue of issues.slice(0, 12)) {
  console.log("series-name-audit: review", JSON.stringify(issue));
}
for (const error of errors) console.error("series-name-audit: ERROR", error);
if (errors.length) process.exitCode = 1;
