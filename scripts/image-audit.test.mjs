import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { inspectManifest } from "./image-audit.mjs";

function valid() {
  return {
    status: "official-series",
    imagePath: "/catalog/verified/factory/series.webp",
    sourceUrl: "https://example.org/catalog/series",
    sourceType: "website",
    verifiedAt: "2026-11-20",
    usagePermission: "permission-granted",
  };
}

test("unverified and missing manifest metadata are rejected", () => {
  assert.ok(inspectManifest(".", { records: { "maker/series": { status: "unverified" } } }).length);
  assert.ok(inspectManifest(".", { records: { "maker/series": { status: "official-series" } } }).length);
  assert.ok(inspectManifest(".", { records: null }).length);
});

test("verified photo requires real local file and evidence", () => {
  const root = mkdtempSync(join(tmpdir(), "kotly-image-check-"));
  try {
    mkdirSync(join(root, "public/catalog/verified/factory"), { recursive: true });
    writeFileSync(join(root, "public/catalog/verified/factory/series.webp"), "dummy");
    assert.deepEqual(inspectManifest(root, { records: { "maker/series": valid() } }), []);
    assert.ok(inspectManifest(root, { records: { "maker/series": { ...valid(), usagePermission: null } } }).length);
    assert.ok(inspectManifest(root, { records: { "maker/series": { ...valid(), sourceUrl: "" } } }).length);
    assert.ok(inspectManifest(root, { records: { "maker/series": { ...valid(), sourceType: "pdf" } } }).length);
    assert.ok(inspectManifest(root, { records: { "maker/series": { ...valid(), imagePath: "/catalog/firetube.jpg" } } }).length);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("placeholder record cannot point to a pretend product photo", () => {
  assert.deepEqual(inspectManifest(".", { records: { "maker/series": { status: "placeholder", imagePath: null } } }), []);
  assert.ok(inspectManifest(".", { records: { "maker/series": { status: "placeholder", imagePath: "/catalog/steam.jpg" } } }).length);
});
