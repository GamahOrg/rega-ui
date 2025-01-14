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
} from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AutoCompleteModule } from "primeng/autocomplete";

import {
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
  BaseFormValueAccessorComponent,
  GStatic,
  Option,
  SelectedItemsPipe,
  SizeEnum,
  SizeType,
  VariantEnum,
  VariantType,
} from "../../../utils";
import { MultiSelectModule } from "primeng/multiselect";

@Component({
  selector: "rega-autocomplete",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    MultiSelectModule,
    SelectedItemsPipe,
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
export class AutocompleteComponent extends BaseFormValueAccessorComponent {
  public options: InputSignal<Option[]> = input([] as Option[]);
  public filteredOptions: WritableSignal<Option[]> = linkedSignal(() => this.options());

  public label: InputSignal<string> = input("label");

  public optionValue: InputSignal<string> = input("label");

  public lazy: InputSignal<boolean> = input(true);

  public multiple: InputSignal<boolean> = input(true);

  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public variant: InputSignal<VariantType> = input(VariantEnum.Default as VariantType);

  public error: InputSignal<boolean> = input(false);
  public linkedError = computed(
    () => (this.touched() && this.hasError()) || this.error()
  );

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public placeholder: InputSignal<string> = input("Placeholder text");

  public autocompleteClass: InputSignal<string> = input("");

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

  public filterOptions = (event: AutoCompleteCompleteEvent): void => {
    const search: string = event.query.toLowerCase();
    const filtered: Option[] = search.length
      ? this.options().filter((op) => op.label.toLowerCase().includes(search))
      : this.options();

    this.filteredOptions.set(filtered);
  };

  public onSelectOption = (event: AutoCompleteSelectEvent): void => {
    const val: Option[] | Option = this.multiple()
      ? GStatic.removeDuplicate([...(this.value || []), event.value])
      : event.value;

    this._updateValue(val);
  };

  public onUnselectOption = (option: Option): void => {
    const options = (this.value as Option[]).filter(({ id }) => id !== option.id);
    setTimeout(() => this._updateValue(options));
  };

  private _updateValue = (value: Option[] | Option): void => {
    this.value = structuredClone(value);
    this.onChange(structuredClone(value));
  };

  filteredItems: any[] = [];

  items: any[] = [];

  constructor() {
    super();
    for (let i = 0; i < 10; i++) {
      this.options().push({ label: "Item label " + i, id: i });
    }
  }
}
