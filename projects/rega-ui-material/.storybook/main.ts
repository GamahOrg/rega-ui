const path = require("path");
import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/lib/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-actions",
    "@storybook/addon-postcss",
    "@storybook/addon-styling-webpack",
    "storybook-addon-rtl",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "./"),
    });
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      include: path.resolve(__dirname, "./"),
    });

    return config;
  },
};

export default config;
