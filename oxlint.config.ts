import { defineConfig } from "oxlint";
import awesomeness from "oxlint-config-awesomeness";

export default defineConfig({
  extends: [awesomeness],
  overrides: [
    {
      files: ["scripts/**"],
      rules: {
        "no-await-in-loop": "off",
      },
    },
  ],
});
