module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/rega-ui-material/**/*.{html,ts,css,scss}",
    "./projects/rega-ui-material/.storybook/**/*.{html,ts}",

    "./projects/**/*.{html,ts}", // Angular library components
    "./projects/rega-ui-material/.storybook/**/*.{js,ts}", // Storybook config
    "./projects/rega-ui-material/src/stories/**/*.{html,ts}", // Storybook stories
  ],
  theme: { extend: {} },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
  ],
};
