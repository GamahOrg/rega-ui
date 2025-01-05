import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  Signal,
} from "@angular/core";

import {
  BaseFormValueAccessorComponent,
  CardType,
  CardTypeEnum,
  ColorEnum,
  ColorType,
  EffectType,
  EffectTypeEnum,
  SizeEnum,
} from "../../../utils";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "rega-card",
  imports: [CommonModule, FormsModule, MatIconModule, CheckboxComponent],
  templateUrl: "./card.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardComponent),
      multi: true,
    },
  ],
})
export class CardComponent extends BaseFormValueAccessorComponent {
  public selected: ModelSignal<boolean> = model(false);

  public defaultExpanded: ModelSignal<boolean> = model(false);

  public type: InputSignal<CardType> = input(CardTypeEnum.Default as CardType);

  public effect: InputSignal<EffectType> = input(EffectTypeEnum.Shadow as EffectType);

  public color: InputSignal<ColorType> = input(ColorEnum.Primary as ColorType);

  public icon: InputSignal<string> = input("check_circle_outline");

  public title: InputSignal<string> = input("");

  public description: InputSignal<string> = input("");

  public expandableContent: InputSignal<string> = input("");

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public cardClass: InputSignal<string> = input("");

  public valueChange: OutputEmitterRef<boolean> = output();

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = [
      "rega-card",
      `rega-card--${this.type()}`,
      `rega-card--${this.effect()}`,
      `rega-card--${this.color()}`,
      this.linkedDisabled() ? "rega-card--disabled" : "",
      this.cardClass(),
    ];

    return classes.filter(Boolean);
  });

  public readonly CardTypeEnum = CardTypeEnum;
  public readonly SizeEnum = SizeEnum;

  public onSelectChange = (val: boolean): void => {
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
  };

  private _effect$ = effect(() => {
    this.onSelectChange(this.selected());
  });
}
