const { promises } = require("fs");
const { join } = require("path");
const { performance } = require("perf_hooks");

const { Klippa, subset } = require("../index");

import { subset } from "klippa";

async function main() {
  const orgFont = await promises.readFile(join(__dirname, "./org-font.ttf"));
  const opts = {
    text: "abc",
  };

  const t = performance.now();
  const outFont = subset(orgFont, opts);

  console.info("Original TTF Size:", `${fmtByteSize(orgFont.byteLength)}`);
  console.info("Output TTF Size  :", `${fmtByteSize(outFont.byteLength)}`);
  console.info("✨ Done in", performance.now() - t, "ms");

  await promises.writeFile(join(__dirname, "./out-font.ttf"), outFont);
}

main();

function fmtByteSize(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${units[i]}`;
}
