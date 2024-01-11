import { join, dirname } from "pathe";
import { defineNuxtModule } from "@nuxt/kit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineNuxtModule({
  hooks: {
    "components:dirs"(dirs) {
      dirs.push({
        path: join(__dirname, "components"),
        prefix: "Sr",
      });
    },
  },
});
