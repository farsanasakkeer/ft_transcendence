import { defineConfig } from "vite";
import history from "connect-history-api-fallback";

// Vite config with SPA fallback support
export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: false,
    middlewareMode: false,
    fs: {
      strict: true,
    },
  },
  plugins: [
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use(
          history({
            verbose: true,
            disableDotRule: true,
            htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          })
        );
      },
    },
  ],
});
