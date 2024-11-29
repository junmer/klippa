# klippa

WIP

## Usage

```js
import { subset } from 'klippa';
import { readFileSync, writeFileSync } from "fs";

const input = readFileSync("font.ttf");
const output = subset(input, { text: "abc" });
console.log(output);
// => { contents: <Buffer 00 01 00 ...> }

writeFileSync("subset.ttf", output);
```
