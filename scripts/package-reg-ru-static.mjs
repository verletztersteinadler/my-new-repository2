#!/usr/bin/env node
/** Package static TanStack Start output for REG.RU/ISPmanager, no Node.js on the host. */
import { cp, copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const source = resolve(root, ".output/public");
const target = resolve(root, "dist-reg-ru");

const srcStat = await stat(source).catch(() => null);
if (!srcStat?.isDirectory()) {
  throw new Error("Missing .output/public - build with npm run build:static first");
}

await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true, force: true });

const shell = resolve(target, "_shell.html");
const shellStat = await stat(shell).catch(() => null);
const index = resolve(target, "index.html");
const indexStat = await stat(index).catch(() => null);

if (shellStat?.isFile()) {
  // TanStack SPA shell is the site's document for / and all client-side routes.
  await copyFile(shell, index);
} else if (!indexStat?.isFile()) {
  throw new Error("Static output has neither _shell.html nor index.html");
}

await copyFile(resolve(root, "scripts/reg-ru/.htaccess"), resolve(target, ".htaccess"));

const entries = await readdir(target);
if (!entries.some((item) => item === "_build" || item === "assets")) {
  throw new Error("Missing compiled client assets in static output");
}

await writeFile(resolve(root, "dist-reg-ru-manifest.json"), JSON.stringify({
  mode: "static",
  files: entries,
  source: "deploy/reg-ru-static",
  warning: "Server/API routes are not shipped; contact form disabled until configured",
}, null, 2) + "\n");

console.log("Static website ready in dist-reg-ru/. Transfer its CONTENTS into /www/kotly.pro/");
console.log("Root files:", entries.join(", "));
