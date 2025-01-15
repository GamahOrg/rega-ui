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
  effect,
  model,
  ModelSignal,
  OutputEmitterRef,
  output,
  inject,
  Injector,
  OnInit,
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
import { ScrollerOptions } from "primeng/api";

@Component({
  selector: "rega-autocomplete",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
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

  public options: InputSignal<Option[]> = input([] as Option[]);
  public filteredOptions: WritableSignal<Option[]> = linkedSignal(() => this.options());

  public label: InputSignal<string> = input("label");

  public optionValue: InputSignal<string> = input("id");

  public lazy: InputSignal<boolean> = input(false);

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

  public autocomplete = viewChild("autocomplete", { read: AutoComplete });

  public selectedOptions: WritableSignal<unknown> = signal(null);

  public overlayVisible: WritableSignal<boolean> = signal(false);

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
    this.filteredOptions.set(this.options());
    this.autocomplete()!.overlayVisible = true;
    this.overlayVisible.set(true);
  };

  public filterOptions = (event: AutoCompleteCompleteEvent): void => {
    if (this.lazy()) {
      this.onSearch.emit(event.query);
      return;
    }

    const search: string = event.query.toLowerCase();
    const filtered: Option[] = search.length
      ? this.options().filter((op) => op.label.toLowerCase().includes(search))
      : this.options();

    this.filteredOptions.set(filtered);
  };

  public onSelectOption = (event: AutoCompleteSelectEvent): void => {
    const eventVal: any = (event.value as any)[this.optionValue()];
    const val: any = this.multiple()
      ? GStatic.removeDuplicate(
          [...((this.selectedOptions() as any) || []), eventVal],
          null
        )
      : eventVal;

    this._updateValue(val);
  };

  public onUnselectOption = (val: any): void => {
    setTimeout(() => {
      const options = (this.selectedOptions() as any[]).filter(
        (opt) => !`${opt}`.includes(val + "")
      );

      this.selectedOptions.set(options);
      this._updateValue(options);
    });
  };

  private _updateValue = (val: any): void => {
    this.value = val;
    this.selectedOptions.set(val);
    this.onChange(val);
  };

  public onChange: (val: any) => void = (val: any) => {};

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    this._updateValue(val);
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

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.options().push({ label: "Item label " + i, id: i });
    }
    this.onLazyLoad.subscribe((res) => console.log(res));
  }

  _effect$ = effect(() => {
    console.log(
      "🚀 ~ AutocompleteComponent ~ _effect$=effect ~ this.selectedItems():",
      this.selectedOptions()
    );
  });
}
