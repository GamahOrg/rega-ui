module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,ts}",
    "./projects/rega-ui-material/**/*.{html,ts,css,scss}",
    "./projects/rega-ui-material/.storybook/**/*.{html,ts}",

    "./projects/**/*.{html,ts}", // Angular library components
    "./projects/rega-ui-material/.storybook/**/*.{js,ts}", // Storybook config
    "./projects/rega-ui-material/src/stories/**/*.{html,ts}", // Storybook stories
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        secondaryColor: "var(--secondary-color)",
        successColor: "var(--success-color)",
        warningColor: "var(--warning-color)",
        errorColor: "var(--error-color)",
        infoColor: "var(--info-color)",
        lightColor: "var(--light-color)",
        disabledColor: "var(--disabled-color)",
        borderColor: "var(--border-color)",
        disabledBorderColor: "var(--disabledCorder-color)",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
  ],
};
