#!/usr/bin/env node
/**
 * Publication gate: scan the visible text of prerendered HTML pages for
 * editorial/debug copy. Inline hydration scripts and CSS are excluded.
 * This does not certify technical data or legal compliance.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(process.argv[2] || ".vercel/output/static");
const patterns = [
  /(?:серия в )?демонстрационн(?:ой|ая|ую)/i,
  /(?:пилотн(?:ая|ый|ой)|исследовательск(?:ий|ая|ое))\s+(?:реестр|групп|список|версия)/i,
  /редакционн(?:ая|ой|ые)\s+(?:очередь|очереди|проверка)/i,
  /данные на проверке|новый раздел\s*[·:]\s*на проверке/i,
  /сверка описаний и характеристик|сверка сайта/i,
  /взято с оф\. сайта производителя|происхождение изображений проверяется отдельно/i,
  /проект текста|версия черновика|требует утверждения оператором/i,
  /группы B и C не публикуются автоматически/i,
  /KOTLY\.SU|kotly-consent-draft/i,
  /завод эту форму не получает|обращение остаётся в справочнике/i,
];
const errors = [];
let count = 0;
function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const pathname = join(dir, name.name);
    if (name.isDirectory()) walk(pathname);
    else if (name.isFile() && name.name.endsWith(".html")) {
      count++;
      const source = readFileSync(pathname, "utf8");
      // Remove embedded JS data, style and markup while retaining customer text.
      const visible = source
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&(?:nbsp|amp|quot|lt|gt);/gi, " ")
        .replace(/\s+/g, " ");
      for (const pattern of patterns) {
        const match = visible.match(pattern);
        if (match) errors.push(pathname.slice(root.length + 1) + ": " + match[0]);
      }
    }
  }
}
if (!existsSync(join(root, "index.html"))) {
  console.error("release-copy-check: prerendered root page is missing");
  process.exit(1);
}
walk(root);
for (const e of errors.slice(0, 35)) console.error("release-copy-check:", e);
console.log("release-copy-check:", count, "HTML pages checked,", errors.length, "internal-copy violations");
if (errors.length) process.exitCode = 1;
