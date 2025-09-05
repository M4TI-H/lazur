import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: true },
  components: [{ path: "~/components", pathPrefix: false }],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
});
