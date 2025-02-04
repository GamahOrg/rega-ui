import { Component, computed, input, InputSignal, Signal } from "@angular/core";

import {
  SizeType,
  SizeEnum,
  ColorEnum,
  ColorType,
  TagVariantType,
  TagVariantEnum,
} from "../../../utils";
import { NgClass } from "@angular/common";

@Component({
  selector: "rega-tag",
  imports: [NgClass],
  template: `<div [ngClass]="classes()"><ng-content /></div>`,
})
export class TagComponent {
  public readonly color: InputSignal<ColorType> = input(ColorEnum.Neutral as ColorType);

  public readonly size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);

  public readonly variant: InputSignal<TagVariantType> = input(
    TagVariantEnum.Contained as TagVariantType
  );

  public readonly rounded: InputSignal<boolean> = input(false);

  public readonly tagClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = [
      "rega-tag",
      `rega-tag--${this.color()}`,
      `rega-tag--${this.size()}`,
      `rega-tag--${this.variant()}`,
      this.tagClass(),
    ];

    if (this.rounded()) classes.push("rega-tag--rounded");
    return classes.filter(Boolean);
  });
}
