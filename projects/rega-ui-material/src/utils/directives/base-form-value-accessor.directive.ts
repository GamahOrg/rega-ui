import {
  AfterViewInit,
  Directive,
  inject,
  Injector,
  signal,
  WritableSignal,
} from "@angular/core";
import { AbstractControl, ControlValueAccessor, NgControl } from "@angular/forms";

@Directive({ selector: "[appBaseFormValueAccessor]" })
export class BaseFormValueAccessorComponent
  implements ControlValueAccessor, AfterViewInit
{
  readonly #injector = inject(Injector);

  #ngControl: NgControl | null = null;

  protected value: any;

  protected isDisabled: WritableSignal<boolean> = signal(false);

  protected hasError: WritableSignal<boolean> = signal(false);

  protected touched: WritableSignal<boolean> = signal(false);

  public ngAfterViewInit(): void {
    this.#ngControl = this.#injector.get(NgControl, null);
    if (this.#ngControl) {
      this.#ngControl.valueAccessor = this;
      const control = this.#ngControl?.control;
      if (control) {
        this.hasError.set(control.invalid);

        control.valueChanges?.subscribe(() => this.hasError.set(control.invalid));
        control.statusChanges?.subscribe(() => this.hasError.set(control.invalid));

        this._observeMarkAsTouched(control);
      }
    }
  }

  public onChange: (val: any) => void = (val: any) => {};

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    this.value = val;
    this.onChange(val);
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

  private _observeMarkAsTouched(control: AbstractControl) {
    const originalMarkAsTouched = control.markAsTouched.bind(control);

    control.markAsTouched = (opts?: { onlySelf?: boolean }) => {
      originalMarkAsTouched(opts);
      if (!this.touched()) {
        this.touched.set(true);
        this.onTouched();
        if (this.#ngControl?.control)
          this.#ngControl.control.markAsTouched({ onlySelf: false });
      }
    };
  }
}
