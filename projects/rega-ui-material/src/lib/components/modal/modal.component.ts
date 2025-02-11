import { NgClass } from "@angular/common";
import { Component, computed, input, InputSignal, Signal } from "@angular/core";

@Component({
  selector: "rega-modal",
  imports: [NgClass],
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  public readonly modalClass: InputSignal<string> = input("");
  public readonly classes: Signal<string[]> = computed(() => [
    "modal-overlay",
    this.modalClass(),
  ]);
}
