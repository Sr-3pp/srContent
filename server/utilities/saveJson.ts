import fs from "fs";

export const saveJson = (url: string, json: any) => {
  fs.writeFileSync(url + ".json", JSON.stringify(json, null, 2));
  return true;
};
