import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  forwardRef,
  input,
  InputSignal,
  linkedSignal,
  Signal,
} from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

import {
  BaseFormValueAccessorComponent,
  SizeEnum,
  SizeType,
  VariantEnum,
  VariantType,
} from "../../../utils";

@Component({
  selector: "rega-autocomplete",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./autocomplete.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent extends BaseFormValueAccessorComponent {
  public label: InputSignal<string> = input("");

  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public variant: InputSignal<VariantType> = input(VariantEnum.Default as VariantType);

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public placeholder: InputSignal<string> = input("Placeholder text");

  public autocompleteClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-autocomplete",
      `rega-autocomplete--${this.size()}`,
      `rega-autocomplete--${this.variant()}`,
      this.linkedError() ? "rega-autocomplete--invalid" : "",
      this.linkedDisabled() ? "rega-autocomplete--disabled" : "",
      this.autocompleteClass(),
    ];

    return classes.filter(Boolean);
  });

  public onInputChange = (event: Event): void => {
    const input: any = (event.target as HTMLInputElement).value;
    this.value = input;
    this.onChange(input);
  };
}
