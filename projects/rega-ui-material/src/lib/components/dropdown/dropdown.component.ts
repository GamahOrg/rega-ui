import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  contentChild,
  forwardRef,
  inject,
  Injector,
  input,
  InputSignal,
  linkedSignal,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { SelectModule } from "primeng/select";

import {
  LazyLoadingEvent,
  Option,
  SizeEnum,
  SizeType,
  VariantEnum,
  VariantType,
} from "../../../utils";
import { ScrollerOptions } from "primeng/api";

@Component({
  selector: "rega-dropdown",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule],
  templateUrl: "./dropdown.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    provideAnimations(),
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnInit {
  readonly #injector = inject(Injector);

  public readonly dropdownOption = contentChild<any | undefined>("dropdownOption");

  public readonly dropdownHeader = contentChild<any | undefined>("dropdownHeader");

  public readonly dropdownFooter = contentChild<any | undefined>("dropdownFooter");

  public readonly options: InputSignal<Option[]> = input([] as Option[]);
  public readonly filteredOptions: WritableSignal<Option[]> = linkedSignal(() =>
    !!this.searchInput()
      ? this.options().filter((op) =>
          op.label.toLowerCase().includes(this.searchInput().toLowerCase())
        )
      : this.options()
  );

  public readonly optionValue: InputSignal<string> = input("id");

  public readonly label: InputSignal<string> = input("");

  public readonly lazy: InputSignal<boolean> = input(false);

  public readonly loading: InputSignal<boolean> = input(false);
  public readonly linkedLoading = linkedSignal(() => this.loading());

  public readonly size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public readonly variant: InputSignal<VariantType> = input(
    VariantEnum.Default as VariantType
  );

  public readonly error: InputSignal<boolean> = input(false);
  public readonly linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public readonly disabled: InputSignal<boolean> = input(false);
  public readonly linkedDisabled = linkedSignal(() => this.disabled());

  public readonly placeholder: InputSignal<string> = input("Placeholder text");

  public readonly dropdownClass: InputSignal<string> = input("");

  public readonly emptyMessage: InputSignal<string> = input("No data found");

  public readonly showClear: InputSignal<boolean> = input(false);

  public readonly filter: InputSignal<boolean> = input(false);

  public readonly onSearch: OutputEmitterRef<string> = output();

  public readonly dropdownChange: OutputEmitterRef<unknown> = output();

  public readonly onLazyLoad: OutputEmitterRef<LazyLoadingEvent> = output();

  public readonly overlayVisible: WritableSignal<boolean> = signal(false);

  public readonly searchInput: WritableSignal<string> = signal("");

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-dropdown",
      `rega-dropdown--${this.size()}`,
      `rega-dropdown--${this.variant()}`,
      this.overlayVisible() ? "rega-dropdown--overlay" : "",
      this.linkedError() ? "rega-dropdown--invalid" : "",
      this.linkedDisabled() ? "rega-dropdown--disabled" : "",
      this.dropdownClass(),
    ];

    return classes.filter(Boolean);
  });

  public readonly lazyOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    itemSize: 34,
    autoSize: true,
    onLazyLoad: (res: LazyLoadingEvent) => this.onLazyLoad.emit(res),
  };

  #ngControl: NgControl | null = null;

  protected value: any;

  public readonly hasError: WritableSignal<boolean> = signal(false);

  public readonly touched: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this.#ngControl = this.#injector.get(NgControl, null);
    if (this.#ngControl) {
      this.#ngControl.valueAccessor = this;
      const control = this.#ngControl?.control;
      this.hasError.set(control!.invalid);
      control?.valueChanges?.subscribe(() => this.hasError.set(control!.invalid));
    }
  }

  public onValueChange = (val: any): void => {
    this.value = val;
    this.dropdownChange.emit(val);
    this.onChange(val);
    this.onTouched();
  };

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
    this.linkedDisabled.set(isDisabled || (this.disabled() as boolean));
  }
}
