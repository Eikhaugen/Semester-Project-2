import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        listing: resolve(__dirname, "./listing/index.html"),
        create: resolve(__dirname, "./create/index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
