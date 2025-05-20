import { defineConfig } from "vitest/config";
// import { resolve } from "path";

export default defineConfig({
  // plugins: [react()],
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
  // resolve: {
  //   alias: {
  //     "@/lib": resolve(__dirname, "./src/lib"),
  //   },
  // },
});
