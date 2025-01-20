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

  public dropdownOption = contentChild<any | undefined>("dropdownOption");

  public dropdownHeader = contentChild<any | undefined>("dropdownHeader");

  public dropdownFooter = contentChild<any | undefined>("dropdownFooter");

  public options: InputSignal<Option[]> = input([] as Option[]);
  public filteredOptions: WritableSignal<Option[]> = linkedSignal(() =>
    !!this.searchInput()
      ? this.options().filter((op) =>
          op.label.toLowerCase().includes(this.searchInput().toLowerCase())
        )
      : this.options()
  );

  public optionValue: InputSignal<string> = input("id");

  public label: InputSignal<string> = input("");

  public lazy: InputSignal<boolean> = input(false);

  public loading: InputSignal<boolean> = input(false);
  public linkedLoading = linkedSignal(() => this.loading());

  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public variant: InputSignal<VariantType> = input(VariantEnum.Default as VariantType);

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = linkedSignal(() => this.disabled());

  public placeholder: InputSignal<string> = input("Placeholder text");

  public dropdownClass: InputSignal<string> = input("");

  public emptyMessage: InputSignal<string> = input("No data found");

  public showClear: InputSignal<boolean> = input(false);

  public filter: InputSignal<boolean> = input(false);

  public onSearch: OutputEmitterRef<string> = output();

  public onLazyLoad: OutputEmitterRef<LazyLoadingEvent> = output();

  public overlayVisible: WritableSignal<boolean> = signal(false);

  public searchInput: WritableSignal<string> = signal("");

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

  public lazyOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    itemSize: 34,
    autoSize: true,
    onLazyLoad: (res: LazyLoadingEvent) => this.onLazyLoad.emit(res),
  };

  #ngControl: NgControl | null = null;

  protected value: any;

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
