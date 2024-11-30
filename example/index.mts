#!/usr/bin/env node --experimental-strip-types
import * as fsPromises from "node:fs/promises";
import * as path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import { subset, type SubsetOptions } from "../index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function main() {
  const orgFont = await fsPromises.readFile(path.join(__dirname, "./org-font.ttf"));
  const opts: SubsetOptions = {
    text: "abc",
  };

  const t = performance.now();
  const outFont = subset(orgFont, opts);

  console.info("Original TTF Size:", `${fmtByteSize(orgFont.byteLength)}`);
  console.info("Output TTF Size  :", `${fmtByteSize(outFont.byteLength)}`);
  console.info("✨ Done in", performance.now() - t, "ms");

  await fsPromises.writeFile(path.join(__dirname, "./out-font.ttf"), outFont);
}

main();

function fmtByteSize(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] as const;
  if (bytes === 0) return "0 B";
  const maybeOverflowIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const i = Math.min(maybeOverflowIndex, units.length - 1);
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${units[i]!}` as const;
}
