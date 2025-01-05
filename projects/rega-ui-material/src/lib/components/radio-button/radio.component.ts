import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  linkedSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  Signal,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

import { ColorEnum, ColorType, SizeEnum, SizeType } from "../../../utils";
import { RadioGroupComponent } from "../../";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "rega-radio-button",
  imports: [NgClass, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: "./radio.component.html",
})
export class RadioButtonComponent {
  readonly #radioGroup = inject(RadioGroupComponent);

  public value: ModelSignal<any> = model("");

  public checked: ModelSignal<boolean> = model(false);

  public label: InputSignal<string> = input("");

  public description: InputSignal<string> = input("");

  public errorMsg: InputSignal<string> = input("");

  public size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);
  public linkedSize = computed(() => this.#radioGroup.size() || this.size());

  public color: InputSignal<ColorType> = input(ColorEnum.Primary as ColorType);
  public linkedColor = computed(() => this.#radioGroup.color() || this.color());

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.#radioGroup.touched() && this.#radioGroup.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(
    () => this.#radioGroup.idDisabled() || this.disabled()
  );

  public readOnly: InputSignal<boolean> = input(false);
  public linkedReadOnly = computed(() => this.readOnly() || this.#radioGroup.readOnly());

  public radioClass: InputSignal<string> = input("");

  public onChange: OutputEmitterRef<boolean> = output();

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-radio",
      `rega-radio--${this.linkedColor()}`,
      `rega-radio--${this.linkedSize()}`,
      this.checked() ? "rega-radio--checked" : "",
      this.linkedReadOnly() ? "rega-radio--readonly" : "",
      this.linkedError() ? "rega-radio--invalid" : "",
      this.linkedDisabled() ? "rega-radio--disabled" : "",
      this.radioClass(),
    ];

    return classes.filter(Boolean);
  });

  public onInputChange = (event: any): void => {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.checked.set(checked);
    this.onChange.emit(checked);
    this.#radioGroup.setValue(this.value());
  };
}
