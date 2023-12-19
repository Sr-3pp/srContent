import { BuildTokens } from "~/assets/ts/utilities";
import fs from "fs";
import { join } from "pathe";

const __dirname = process.cwd();
const dir: string = join(__dirname, "assets");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

import color from "./src/color.json" assert { type: "json" };
import breakpoint from "./src/breakpoint.json" assert { type: "json" };
import font from "./src/font.json" assert { type: "json" };
import size from "./src/size.json" assert { type: "json" };

const inputs: any[] = [color, breakpoint, font, size];

const builder = new BuildTokens(dir, inputs);
builder.init();
