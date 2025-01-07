import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import { routes } from "./app.routes";
import { PrimeNgPreset } from "src/styles/prime-theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: PrimeNgPreset, options: { darkModeSelector: false || "none" } },
    }),
  ],
};
