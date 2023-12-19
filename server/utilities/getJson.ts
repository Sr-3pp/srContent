import fs from "fs";

export const getJson = (url: string) => {
  try {
    const file = fs.readFileSync(url + ".json", "utf-8");
    return JSON.parse(file);
  } catch (error) {
    return { error };
  }
};
