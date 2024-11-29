import test from "ava";
import { promises as promisesFs } from "fs";
import { join } from "path";
import { fileURLToPath } from "node:url";

import { subset } from "../index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

test("subset should small", async (t) => {
  const orgFont = await promisesFs.readFile(
    join(__dirname, "../example/org-font.ttf"),
  );
  const opts = {
    text: "abc",
  };
  const ttfBuffer = subset(orgFont, opts);
  t.assert(orgFont.byteLength > ttfBuffer.byteLength);
});
