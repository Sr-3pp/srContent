import { join } from "pathe";
import { saveJson, getJson } from "../../utilities";
const _dir = process.cwd();

export default defineEventHandler(async (event) => {
  const { page, path } = getQuery(event);
  const data = await readBody(event);
  const url: string = join(_dir, "content", page as string);

  const json = getJson(url);

  const findKey = (pathArr: string[], obj: any) => {
    const key = pathArr.shift();
    if (pathArr.length > 0) {
      findKey(pathArr, obj[key as string]);
    } else {
      obj[key as string] = data;
    }
  };

  const arr = (path as string).split(".");
  findKey(arr, json);

  try {
    saveJson(url, json);
    return true;
  } catch (error) {
    return error;
  }
});
