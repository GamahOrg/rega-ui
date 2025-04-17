import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  linkedSignal,
  output,
  OutputEmitterRef,
  Signal,
} from "@angular/core";
import { SizeType, SizeEnum } from "../../../utils";
import { NgClass } from "@angular/common";
import { TabListComponent } from "./tab-list.component";

@Component({
  selector: "rega-tab",
  imports: [NgClass],
  templateUrl: "./tab.component.html",
})
export class TabComponent {
  readonly #tabList = inject(TabListComponent);

  public readonly size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);
  public readonly linkedSize = linkedSignal(() => this.#tabList.size() || this.size());

  public readonly selected: InputSignal<boolean> = input(false);
  public readonly linkedSelected = linkedSignal(() => this.selected());

  public readonly vertical: InputSignal<boolean> = input(false);
  public readonly linkedVertical = linkedSignal(
    () => this.#tabList.vertical() || this.vertical()
  );

  public readonly flush: InputSignal<boolean> = input(false);
  public readonly linkedFlush = linkedSignal(() => this.#tabList.flush() || this.flush());

  public readonly disabled: InputSignal<boolean> = input(false);

  public readonly tabClass: InputSignal<string> = input("");

  public onSelect: OutputEmitterRef<void> = output();

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = [
      "rega-tab",
      `rega-tab--${this.linkedSize()}`,
      this.tabClass(),
    ];

    if (this.linkedFlush()) classes.push("rega-tab--flush");
    if (this.linkedVertical()) classes.push("rega-tab--vertical");
    if (this.disabled()) classes.push("rega-tab--disabled");
    if (this.linkedSelected()) classes.push("rega-tab--selected");

    return classes.filter(Boolean);
  });
}
