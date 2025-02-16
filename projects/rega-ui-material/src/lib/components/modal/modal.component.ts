import { NgClass } from "@angular/common";
import { Component, computed, inject, input, InputSignal, Signal } from "@angular/core";
import { ALIGN, ModalAlignType, STYLE_CLASSES } from "../../../utils";
@Component({
  selector: "rega-modal",
  imports: [NgClass],
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  readonly #align: ModalAlignType = inject(ALIGN);
  readonly #styleClasses: string[] = inject(STYLE_CLASSES);

  public readonly modalClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = computed(() => [
    "rega-modal",
    `modal-align--${this.#align}`,
    ...this.#styleClasses,
    this.modalClass(),
  ]);
}
