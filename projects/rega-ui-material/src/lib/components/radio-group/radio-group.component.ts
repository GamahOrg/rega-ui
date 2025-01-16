import {
  Component,
  ContentChildren,
  forwardRef,
  inject,
  Injector,
  input,
  InputSignal,
  linkedSignal,
  output,
  OutputEmitterRef,
  QueryList,
  signal,
  WritableSignal,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { ColorType, SizeType } from "../../../utils";
import { RadioButtonComponent } from "../radio-button/radio.component";
@Component({
  selector: "rega-radio-group",
  template: `<ng-content />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor {
  readonly #injector = inject(Injector);

  @ContentChildren(forwardRef(() => RadioButtonComponent))
  private _radioButtons!: QueryList<RadioButtonComponent>;

  public size: InputSignal<SizeType | undefined> = input();

  public color: InputSignal<ColorType | undefined> = input();

  public readOnly: InputSignal<boolean | undefined> = input();

  public disabled: InputSignal<boolean | undefined> = input();

  public valueChange: OutputEmitterRef<any> = output();

  #ngControl: NgControl | null = null;

  protected value: any;

  public idDisabled: WritableSignal<boolean> = linkedSignal(
    () => this.disabled() || false
  );

  public hasError: WritableSignal<boolean> = signal(false);

  public touched: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this.#ngControl = this.#injector.get(NgControl, null);
    if (this.#ngControl) {
      this.#ngControl.valueAccessor = this;
      const control = this.#ngControl?.control;
      this.hasError.set(control!.invalid);
      control?.valueChanges?.subscribe(() => this.hasError.set(control!.invalid));
    }
  }

  public onChange: (val: any) => void = (val: any) => {};

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    !!val && (this.value = val);
    this._updateSelectedRadio();
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched = (fn: () => void) => {
    this.onTouched = fn;
  };

  public setDisabledState?(isDisabled: boolean): void {
    this.idDisabled.set(isDisabled || (this.disabled() as boolean));
  }

  public setValue = (value: any): void => {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
    this._updateSelectedRadio();
  };

  private _updateSelectedRadio(): void {
    setTimeout(() => {
      if (this._radioButtons) {
        this._radioButtons.forEach((btn) => btn.checked.set(btn.value() == this.value));
      }
    });
  }
}
