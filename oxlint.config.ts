import { defineConfig } from "oxlint";
import awesomeness from "oxlint-config-awesomeness";

export default defineConfig({
  extends: [awesomeness],
  jsPlugins: ["@shadcn/lint"],
  overrides: [
    {
      files: ["scripts/**"],
      rules: {
        "no-await-in-loop": "off",
      },
    },
  ],
  rules: {
    "shadcn/no-arbitrary-values": "error",
    "shadcn/no-inline-styles": "error",
    "shadcn/no-raw-colors": "error",
    "shadcn/no-restyle": [
      "error",
      {
        allow: ["layout"],
        contracts: [
          {
            allow: ["layout", "gap-*"],
            pattern: "^PopoverTrigger$",
          },
        ],
      },
    ],
    "shadcn/no-unknown-classes": "error",
    "shadcn/require-static-classes": "error",
  },
});
