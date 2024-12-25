import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  contentChild,
  forwardRef,
  input,
  InputSignal,
  linkedSignal,
  Signal,
} from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import {
  BaseFormValueAccessorComponent,
  InputPrefixDirective,
  InputSuffixDirective,
  InputVariantEnum,
  InputVariantType,
  SizeEnum,
  SizeType,
} from "../../../utils";

@Component({
  selector:
    "rega-text-input[formControlName],rega-text-input[ngModel],rega-text-input[formControl]",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./text-input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent extends BaseFormValueAccessorComponent {
  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public label: InputSignal<string> = input("");

  public variant: InputSignal<InputVariantType> = input(
    InputVariantEnum.Default as InputVariantType
  );

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public placeholder: InputSignal<string> = input("Placeholder text");

  public readOnly: InputSignal<boolean> = input(false);

  public prefix: InputSignal<string> = input("");

  public suffix: InputSignal<string> = input("");

  public prefixClass: InputSignal<string> = input("");

  public suffixClass: InputSignal<string> = input("");

  public inputClass: InputSignal<string> = input("");

  public inputPrefix = contentChild<InputPrefixDirective>(InputPrefixDirective);

  public inputSuffix = contentChild<InputSuffixDirective>(InputSuffixDirective);

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-input",
      `rega-input--${this.size()}`,
      `rega-input--${this.variant()}`,
      this.linkedError() ? "rega-input--invalid" : "",
      this.linkedDisabled() ? "rega-input--disabled" : "",
      this.prefix() || this.inputPrefix() ? "rega-input--prefix-" + this.size() : "",
      this.suffix() || this.inputSuffix() ? "rega-input--suffix-" + this.size() : "",
      this.inputClass(),
    ];

    return classes.filter(Boolean);
  });

  public onInputChange = (event: Event): void => {
    const input: any = (event.target as HTMLInputElement).value;
    this.value = input;
    this.onChange(input);
  };
}
