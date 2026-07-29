import { defineConfig } from "oxlint";
import awesomeness from "oxlint-config-awesomeness";

export default defineConfig({
  extends: [awesomeness],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  overrides: [
    {
      files: ["scripts/**"],
      rules: {
        // Polling a dev server is sequential by nature: each probe has to see
        // the previous one's result before deciding whether to sleep again.
        "no-await-in-loop": "off",
      },
    },
  ],
});
