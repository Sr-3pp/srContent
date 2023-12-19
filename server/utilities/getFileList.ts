import fs from "fs";

export const getFileList = (url: string) => {
  try {
    const files = fs.readdirSync(url).map((file) => {
      const name = file.replace(".json", "");
      return {
        name,
        url: `${url.replace(process.cwd() + "/content", "")}/${name}`,
      };
    });
    return files;
  } catch (error) {
    return [{ error }];
  }
};
