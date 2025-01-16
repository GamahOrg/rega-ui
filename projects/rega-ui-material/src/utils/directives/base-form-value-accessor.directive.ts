import { Directive, inject, Injector, signal, WritableSignal } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Directive({ selector: "[appBaseFormValueAccessor]" })
export class BaseFormValueAccessorComponent implements ControlValueAccessor {
  readonly #injector = inject(Injector);

  #ngControl: NgControl | null = null;

  protected value: any;

  protected isDisabled: WritableSignal<boolean> = signal(false);

  protected hasError: WritableSignal<boolean> = signal(false);

  protected touched: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this.#ngControl = this.#injector.get(NgControl, null);
    if (this.#ngControl) {
      this.#ngControl.valueAccessor = this;
      const control = this.#ngControl?.control;
      if (control) this.hasError.set(control!.invalid);
      control?.valueChanges?.subscribe(() => this.hasError.set(control!.invalid));
    }
  }

  public onChange: (val: any) => void = (val: any) => {};

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    !!val && (this.value = val);
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched = (fn: () => void) => {
    this.onTouched = fn;
  };

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
