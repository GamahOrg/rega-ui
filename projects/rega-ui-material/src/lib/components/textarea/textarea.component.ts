import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  forwardRef,
  input,
  InputSignal,
  linkedSignal,
  signal,
  Signal,
} from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import {
  BaseFormValueAccessorComponent,
  GStatic,
  TextareaVariantEnum,
  TextareaVariantType,
} from "../../../utils";

@Component({
  selector:
    "rega-textarea[formControlName],rega-textarea[ngModel],rega-textarea[formControl]",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./textarea.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent extends BaseFormValueAccessorComponent {
  public label: InputSignal<string> = input("");

  public variant: InputSignal<TextareaVariantType> = input(
    TextareaVariantEnum.Default as TextareaVariantType
  );

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public placeholder: InputSignal<string> = input("Placeholder text");

  public readOnly: InputSignal<boolean> = input(false);

  public textareaClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-textarea",
      `rega-textarea--${this.variant()}`,
      this.linkedError() ? "rega-textarea--invalid" : "",
      this.linkedDisabled() ? "rega-textarea--disabled" : "",
      this.textareaClass(),
    ];

    return classes.filter(Boolean);
  });

  public readonly uniqueId: Signal<string> = signal(GStatic.uniqueId);

  public onInputChange = (event: Event): void => {
    const input: any = (event.target as HTMLInputElement).value;
    this.value = input;
    this.onChange(input);
  };
}
