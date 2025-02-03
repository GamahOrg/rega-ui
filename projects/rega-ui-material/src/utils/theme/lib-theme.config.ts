import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";

import { PrimeNgPreset } from "./prime-theme";

export const provideRegaTheme = (): ApplicationConfig["providers"] => [
  provideAnimationsAsync(),
  providePrimeNG({
    theme: { preset: PrimeNgPreset, options: { darkModeSelector: false || "none" } },
  }),
];
