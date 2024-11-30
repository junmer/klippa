// @ts-check
/** @import { type SubsetOptions } from "../index.js"; */
import test from "ava";
import { promises as fsPromises } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { subset } from "../index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

test("subset should small", async (t) => {
  const orgFont = await fsPromises.readFile(
    path.join(__dirname, "../example/org-font.ttf"),
  );
  /** @type {SubsetOptions} */
  const opts = {
    text: "abc",
  };
  const ttfBuffer = subset(orgFont, opts);
  t.assert(orgFont.byteLength > ttfBuffer.byteLength);
});
