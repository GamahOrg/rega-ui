import { APP_INITIALIZER } from "@angular/core";
import { applicationConfig, type Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { provideAnimations } from "@angular/platform-browser/animations";
import { PrimeNG } from "primeng/config";
import { PrimeNgPreset } from "../../../src/styles/prime-theme";
import docJson from "../documentation.json";

setCompodocJson(docJson);

const provideTheme = (config: PrimeNG): any => {
  return () => {
    config.theme.set({
      preset: PrimeNgPreset,
      options: { darkModeSelector: false || "none" },
    });
  };
};

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        {
          provide: APP_INITIALIZER,
          useFactory: provideTheme,
          deps: [PrimeNG],
          multi: true,
        },
      ],
    }),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
