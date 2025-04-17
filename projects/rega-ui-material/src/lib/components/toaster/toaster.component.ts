import { NgClass } from "@angular/common";
import { Component, model } from "@angular/core";

@Component({
  selector: "rega-toaster",
  imports: [NgClass],
  templateUrl: "./toaster.component.html",
})
export class Toaster {
  message = model<string>("");
  type = model<"success" | "error" | "warning" | "info">("success");

  get toastClass(): string {
    return `toast ${this.type()}`;
  }

  onClose(): void {
    // Emit an event or handle close logic
  }
}
