import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// STATIC build for Hostinger (public_html): no Node server needed.
// Output: dist/client  (upload the CONTENTS of this folder)
export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});