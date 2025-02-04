import { Component, computed, input, InputSignal, Signal } from "@angular/core";
import { SizeType, SizeEnum } from "../../../utils";
import { NgClass } from "@angular/common";

@Component({
  selector: "rega-tab",
  imports: [NgClass],
  templateUrl: "./tab.component.html",
})
export class TabComponent {
  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public selected: InputSignal<boolean> = input(false);

  public disabled: InputSignal<boolean> = input(false);

  public tabClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = ["rega-tab", `rega-tab--${this.size()}`, this.tabClass()];

    if (this.disabled()) classes.push("rega-tab--disabled");
    if (this.selected()) classes.push("rega-tab--selected");

    return classes.filter(Boolean);
  });
}
