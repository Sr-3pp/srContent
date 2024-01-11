import { join } from "pathe";
import { defineNuxtModule } from "@nuxt/kit";

const __dirname = process.cwd();

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
