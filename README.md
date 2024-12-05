# klippa

klippa is a high-performance font subset toolkit, powered by the Rust-based [klippa][klippa-link] project, and it binds to Node.js via  [napi-rs][napi-rs-link].

⚠️ Warning: This project is in the pre-release stage, and there may be some bugs.

<a href="https://github.com/junmer/klippa/actions"><img alt="GitHub CI Status" src="https://github.com/junmer/klippa/workflows/CI/badge.svg"></a>
<a href="https://www.npmjs.com/package/@refont/klippa"><img src="https://img.shields.io/npm/v/@refont/klippa.svg?sanitize=true" alt="@refont/klippa npm version"></a>
<a href="https://npmcharts.com/compare/@refont/klippa?minimal=true"><img src="https://img.shields.io/npm/dm/@refont/klippa.svg?sanitize=true" alt="@refont/klippa downloads"></a>

## Usage

```js
import { subset } from '@refont/klippa';
import { readFileSync, writeFileSync } from "node:fs";

// Read the font file
const input = readFileSync("font.ttf");

// Create a subset of the font with the specified text
const output = subset(input, { text: "abc" });

console.log(output);
// => { contents: <Buffer 00 01 00 ...> }

// Write the subsetted font to a new file
writeFileSync("subset.ttf", output);
```

## Roadmap

- [x] Subset font from text
- [ ] Implement the [kern](https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6kern.html) table
- [ ] Implement additional necessary [SubsetFlags](https://github.com/googlefonts/fontations/blob/main/klippa/src/lib.rs#L59)

## Related

[klippa][klippa-link] : A Rust binary for subsetting a font file according to provided input.

[napi-rs][napi-rs-link] : A framework for building compiled Node.js add-ons in Rust via Node-API.

[klippa-link]: https://github.com/googlefonts/fontations/tree/main/klippa

[napi-rs-link]: https://github.com/napi-rs/napi-rs
