import fs from "fs";
import { join } from "pathe";

const dir = join(process.cwd(), "public", "media");

export default defineEventHandler((event) => {
  const { type } = getRouterParams(event);
  let url: string;
  if (type == "icons") {
    url = join(dir.replace("/media", ""), "icons");
  } else {
    url = join(dir, type as string);
  }
  const files = fs.readdirSync(url);

  const media = files.map((file) => {
    return {
      name: file.replace(/\.[^/.]+$/, ""),
      url: join("/media", type as string, file),
    };
  });
  return media;
});
