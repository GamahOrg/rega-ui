import { providePrimeNG } from "primeng/config";
import { PrimeNgPreset } from "../../../src/styles/prime-theme";

export const PrimeNgConfig = providePrimeNG({
  theme: {
    preset: PrimeNgPreset,
    options: { darkModeSelector: false || "none" },
  },
});
