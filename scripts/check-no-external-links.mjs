import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const output = resolve(process.argv[2] ?? ".vercel/output/static");
const bad = [];

function visit(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) { visit(path); continue; }
    if (!/\.html$/i.test(path)) continue;
    const html = readFileSync(path, "utf8");
    for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
      const href = match[1].trim();
      if (/^https?:\/\//i.test(href) && !/^https?:\/\/(?:www\.)?kotly\.pro(?:[:/\?#]|$)/i.test(href)) {
        bad.push({ page: path, href });
      }
    }
  }
}

visit(output);
if (bad.length) {
  console.error("External outbound links found:", JSON.stringify(bad.slice(0, 30), null, 2));
  process.exit(1);
}
console.log("Outbound-link audit passed: no external anchor links in prerendered HTML.");
