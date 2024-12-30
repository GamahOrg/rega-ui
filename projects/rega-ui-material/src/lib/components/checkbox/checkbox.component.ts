import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  computed,
  forwardRef,
  input,
  InputSignal,
  linkedSignal,
  output,
  OutputEmitterRef,
  Signal,
} from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import {
  BaseFormValueAccessorComponent,
  ColorEnum,
  ColorType,
  SizeEnum,
  SizeType,
} from "../../../utils";
import { initFlowbite } from "flowbite";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector:
    "rega-checkbox[formControlName],rega-checkbox[ngModel],rega-checkbox[formControl]",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: "./checkbox.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent
  extends BaseFormValueAccessorComponent
  implements AfterViewInit
{
  public label: InputSignal<string> = input("Label");

  public description: InputSignal<string> = input("");

  public color: InputSignal<ColorType> = input(ColorEnum.Primary as ColorType);

  public size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);

  public errorMsg: InputSignal<string> = input("");

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public checkboxClass: InputSignal<string> = input("");

  public change: OutputEmitterRef<any> = output();

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-checkbox",
      `rega-checkbox--${this.color()}`,
      `rega-checkbox--${this.size()}`,
      this.linkedDisabled() ? "rega-checkbox--disabled" : "",
      this.checkboxClass(),
    ];

    return classes.filter(Boolean);
  });

  public ngAfterViewInit(): void {
    initFlowbite();
  }

  public onCheckboxChange = (event: Event): void => {
    const input: any = (event.target as HTMLInputElement).checked;
    this.value = input;
    this.onChange(input);
  };
}
