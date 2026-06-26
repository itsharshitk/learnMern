// vitest.config.cjs
const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/tests/setup.js"],
  },
});