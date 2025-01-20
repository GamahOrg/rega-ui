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
  WritableSignal,
  viewChild,
  OutputEmitterRef,
  output,
  inject,
  Injector,
  OnInit,
  contentChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AutoComplete, AutoCompleteModule } from "primeng/autocomplete";

import {
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
  GStatic,
  LazyLoadingEvent,
  Option,
  SelectedOptionPipe,
  SizeEnum,
  SizeType,
  VariantEnum,
  VariantType,
} from "../../../utils";
import { MultiSelectModule } from "primeng/multiselect";
import { SkeletonModule } from "primeng/skeleton";
import { ScrollerOptions } from "primeng/api";

@Component({
  selector: "rega-autocomplete",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    SkeletonModule,
    MultiSelectModule,
    SelectedOptionPipe,
  ],
  templateUrl: "./autocomplete.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
    provideAnimations(),
  ],
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  readonly #injector = inject(Injector);

  private readonly _autocomplete = viewChild("autocomplete", { read: AutoComplete });

  public autocompleteHeader = contentChild<any | undefined>("autocompleteHeader");

  public autocompleteFooter = contentChild<any | undefined>("autocompleteFooter");

  public options: InputSignal<Option[] | string[]> = input([] as Option[] | string[]);
  public filteredOptions: WritableSignal<Option[] | string[]> = linkedSignal(() =>
    this.options()
  );

  public label: InputSignal<string> = input("");

  public lazy: InputSignal<boolean> = input(false);

  public loading: InputSignal<boolean> = input(false);
  public linkedLoading = linkedSignal(() => this.loading());

  public multiple: InputSignal<boolean> = input(false);

  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public variant: InputSignal<VariantType> = input(VariantEnum.Default as VariantType);

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = linkedSignal(() => this.disabled());

  public placeholder: InputSignal<string> = input("Placeholder text");

  public autocompleteClass: InputSignal<string> = input("");

  public emptyMessage: InputSignal<string> = input("No data found");

  public onSearch: OutputEmitterRef<string> = output();

  public onLazyLoad: OutputEmitterRef<LazyLoadingEvent> = output();

  public selectedOptions: WritableSignal<string | string[]> = linkedSignal(() =>
    this.multiple() ? [] : ""
  );

  public overlayVisible: WritableSignal<boolean> = signal(false);

  public optionValue: Signal<string> = computed(() => (this.multiple() ? "id" : ""));

  public dropdownIcon: Signal<string> = computed(() =>
    this.overlayVisible() ? "pi pi-angle-up" : "pi pi-angle-down"
  );

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-autocomplete",
      `rega-autocomplete--${this.size()}`,
      `rega-autocomplete--${this.variant()}`,
      this.overlayVisible() ? "rega-autocomplete--overlay" : "",
      this.linkedError() ? "rega-autocomplete--invalid" : "",
      this.linkedDisabled() ? "rega-autocomplete--disabled" : "",
      this.autocompleteClass(),
    ];

    return classes.filter(Boolean);
  });

  #ngControl: NgControl | null = null;

  protected value: any;

  public hasError: WritableSignal<boolean> = signal(false);

  public touched: WritableSignal<boolean> = signal(false);

  public lazyOptions: ScrollerOptions = {
    delay: 250,
    showLoader: false,
    lazy: true,
    itemSize: 34,
    onLazyLoad: (res: LazyLoadingEvent) => this.onLazyLoad.emit(res),
  };

  public ngOnInit(): void {
    this.#ngControl = this.#injector.get(NgControl, null);
    if (this.#ngControl) {
      this.#ngControl.valueAccessor = this;
      const control = this.#ngControl?.control;
      this.hasError.set(control!.invalid);
      control?.valueChanges?.subscribe(() => this.hasError.set(control!.invalid));
    }
  }

  public onClickAutocomplete = (): void => {
    if (!this.linkedDisabled()) {
      this.filteredOptions.set(this.options());
      this._autocomplete()!.overlayVisible = true;
      this.overlayVisible.set(true);
    }
  };

  public filterOptions = (event: AutoCompleteCompleteEvent): void => {
    const search: string = event.query.toLowerCase();

    if (!this.multiple()) this._updateValue(search);

    setTimeout(() => {
      if (this.lazy()) {
        if (this.filteredOptions().length === 0) {
          const options = Array.from({ length: 4 }, (_, id) => ({ id, label: id }));
          this.filteredOptions.set(options);
        }

        this.linkedLoading.set(true);
        this.onSearch.emit(event.query);
        return;
      }

      const filtered: Option[] | string[] = search.length
        ? this.multiple()
          ? (this.options() as Option[]).filter((op) =>
              op.label.toLowerCase().includes(search)
            )
          : (this.options() as string[]).filter((op) => op.toLowerCase().includes(search))
        : this.options();

      this.filteredOptions.set(filtered);
    });
  };

  public onSelectOption = (event: AutoCompleteSelectEvent): void => {
    const result: string | string[] = this.multiple()
      ? GStatic.removeDuplicate(
          [...((this.selectedOptions() as string[]) || []), (event.value as any)["id"]],
          null
        )
      : event.value;

    this._updateValue(result);
  };

  public onUnselectOption = (val: Option | string): void => {
    setTimeout(() => {
      const options = this.multiple()
        ? (this.selectedOptions() as string[]).filter(
            (id: string) => id !== (val as Option).id
          )
        : "";

      this.selectedOptions.set(options);
      this._updateValue(options);
    });
  };

  private _updateValue = (val: string | string[]): void => {
    this.value = val;
    this.selectedOptions.set(val);
    this.onChange(val);
  };

  public onChange: (val: any) => void = (val: any) => {};

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    this._updateValue(val as any);
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
