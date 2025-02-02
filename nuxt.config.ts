// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  css: [
    "~/assets/scss/reset.scss",
    "~/assets/scss/main.scss",
    "~/assets/scss/Form.scss",
    "normalize.css/normalize.css",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/utilities/index.scss" as *;`,
        },
      },
    },
  },

  compatibilityDate: "2025-01-10",
});