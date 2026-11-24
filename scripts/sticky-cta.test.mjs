import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source=readFileSync("src/components/pick-bar.tsx","utf8");
const root=readFileSync("src/routes/__root.tsx","utf8");

test("CTA is fixed to viewport bottom rather than right-side rail",()=>{
  assert.match(source,/fixed inset-x-0 bottom-0/);
  assert.doesNotMatch(source,/top-1\/2 right-0/);
  assert.match(source,/Оставить заявку/);
  assert.match(source,/h-28 sm:h-24/);
  assert.match(source,/safe-area-inset-bottom/);
  assert.match(root,/<PickBar\s*\/>/);
});
test("CTA opens accessible form without inventing a new backend",()=>{
  assert.match(source,/<Dialog\.Root/);
  assert.match(source,/<Dialog\.Trigger asChild>/);
  assert.match(source,/<LeadForm/);
  assert.match(source,/context=\{\{ intent: "request" \}\}/);
  assert.match(source,/aria-label="Закрыть форму заявки"/);
  assert.match(source,/print:hidden/);
});
test("Privacy and consent routes are not obscured by sales solicitation",()=>{
  assert.match(source,/pathname\.startsWith\("\/politika"\)/);
  assert.match(source,/pathname\.startsWith\("\/soglasie"\)/);
});
