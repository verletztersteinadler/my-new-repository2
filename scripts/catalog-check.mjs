#!/usr/bin/env node
/**
 * Catalog gate. Fails when a factory is listed twice and the extra card has
 * no series, and when a published series is not wired to its page.
 *
 *   node scripts/catalog-check.mjs [--root <dir>]
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { projectRoot } from "./with-app-env.mjs";

const GENERIC = new Set(
  "завод котлы котел котельный котельная группа компания энерго energy system systems boiler boilers group industrial industrie heating power steam".split(
    " ",
  ),
);

export function fold(value) {
  return String(value)
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function segments(value) {
  const paren = [...String(value).matchAll(/\(([^)]+)\)/g)].map((match) => match[1]);
  const plain = String(value).replace(/\([^)]*\)/g, " ");
  return [...plain.split("/"), ...paren].map(fold).filter((item) => item.length >= 4 && !GENERIC.has(item));
}

export function catalogProblems({ manufacturers, catalogs, pageSlugs, slugList }) {
  const problems = [];
  if (slugList) {
    const catalogSlugs = new Set(catalogs.map((catalog) => catalog.slug));
    const lightSlugs = new Set(slugList);
    for (const slug of lightSlugs) {
      if (!catalogSlugs.has(slug)) problems.push(`published-slugs.ts: slug ${slug} отсутствует в publishedCatalogs (series-index.ts)`);
    }
    for (const slug of catalogSlugs) {
      if (!lightSlugs.has(slug)) problems.push(`published-slugs.ts не синхронизирован с series-index.ts: нет slug ${slug}`);
    }
  }
  const seen = new Map();
  for (const item of manufacturers) {
    if (seen.has(item.slug)) problems.push(`повтор slug ${item.slug}`);
    seen.set(item.slug, item);
  }
  const opened = new Set();
  const seenCatalog = new Set();
  for (const catalog of catalogs) {
    if (seenCatalog.has(catalog.slug)) problems.push(`повтор ряда у ${catalog.slug}`);
    seenCatalog.add(catalog.slug);
    if (!seen.has(catalog.slug)) problems.push(`ряд ${catalog.slug} нет в реестре`);
    else opened.add(catalog.slug);
  }
  for (const slug of opened) {
    if (!pageSlugs.has(slug)) problems.push(`карточка ${slug} не подключена к странице`);
  }
  for (const slug of pageSlugs) {
    if (!seen.has(slug)) problems.push(`страница ссылается на неизвестный slug ${slug}`);
  }

  const openedItems = manufacturers.filter((item) => opened.has(item.slug));
  for (const item of manufacturers) {
    if (opened.has(item.slug)) continue;
    const title = fold(item.title);
    if (title.length < 4 || GENERIC.has(title)) continue;
    for (const other of openedItems) {
      if (fold(other.title) === title) {
        problems.push(`пустой дубль «${item.title}» (${item.slug}): ряд уже у ${other.slug}`);
        break;
      }
      const alias = segments(`${other.title} ${other.name}`).some((part) => part === title);
      if (alias) {
        problems.push(`пустой дубль «${item.title}» (${item.slug}): это алиас ${other.slug}`);
        break;
      }
    }
  }
  return problems;
}

export function readCatalogSources(root) {
  const manufacturersText = readFileSync(join(root, "src/data/manufacturers.ts"), "utf8");
  const indexText = readFileSync(join(root, "src/data/series-index.ts"), "utf8");
  const pageText = readFileSync(join(root, "src/components/catalog-page.tsx"), "utf8");
  const fillText = existsSync(join(root, "src/data/fill-rest.ts")) ? readFileSync(join(root, "src/data/fill-rest.ts"), "utf8") : "";
  const slugsText = existsSync(join(root, "src/data/published-slugs.ts")) ? readFileSync(join(root, "src/data/published-slugs.ts"), "utf8") : "";
  const slugList = [...slugsText.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  const manufacturers = [...manufacturersText.matchAll(/slug: "([^"]+)", title: "(.*?)", name: "(.*?)"/g)].map((match) => ({
    slug: match[1],
    title: match[2],
    name: match[3],
  }));
  const block = indexText.slice(indexText.indexOf("export const publishedCatalogs"), indexText.indexOf("function family"));
  const catalogs = [...block.matchAll(/slug: "([^"]+)"/g)].map((match) => ({ slug: match[1] }));
  const pageSlugs = new Set([...pageText.matchAll(/slug === "([^"]+)"/g)].map((match) => match[1]));
  if (pageText.includes("fillBySlug")) {
    for (const match of fillText.matchAll(/one\("([^"]+)"/g)) pageSlugs.add(match[1]);
  }
  return { manufacturers, catalogs, pageSlugs, slugList };
}

function main() {
  const rootFlag = process.argv.indexOf("--root");
  const root = rootFlag >= 0 ? process.argv[rootFlag + 1] : projectRoot();
  const problems = catalogProblems(readCatalogSources(root));
  if (problems.length === 0) {
    console.log("catalog-check: ok");
    return;
  }
  for (const problem of problems) console.error(`catalog-check: ${problem}`);
  process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
