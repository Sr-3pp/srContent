import { getFileList, getJson } from "../../utilities";
import { join } from "pathe";

const _dir = process.cwd();

export default defineEventHandler((event) => {
  const { dir, page } = getQuery(event);

  if (dir) {
    const files = getFileList(join(_dir, "content", dir as string));
    return files;
  }

  const url: string = join(_dir, "content", page as string);
  const json = getJson(url);

  return json;
});
