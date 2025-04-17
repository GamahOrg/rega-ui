import {
  AfterContentInit,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  input,
  InputSignal,
  model,
  ModelSignal,
  Signal,
} from "@angular/core";
import { NgClass } from "@angular/common";

import { TabComponent } from "../tab/tab.component";
import { SizeType, SizeEnum } from "../../../utils";

@Component({
  selector: "rega-tab-list",
  imports: [NgClass],
  template: ` <div [ngClass]="classes()"><ng-content /></div> `,
})
export class TabListComponent implements AfterContentInit {
  public tabList: Signal<readonly TabComponent[]> = contentChildren(
    forwardRef(() => TabComponent)
  );

  public readonly selectedIndex: ModelSignal<number> = model(0);

  public readonly size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public readonly vertical: InputSignal<boolean> = input(false);

  public readonly flush: InputSignal<boolean> = input(false);

  public readonly tabListClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = ["rega-tab-list", this.tabListClass()];

    if (this.vertical()) classes.push("rega-tab-list--vertical");
    return classes.filter(Boolean);
  });

  public ngAfterContentInit(): void {
    if (this.tabList().length > 0) {
      this.tabList().forEach((tab, index) => {
        tab.onSelect.subscribe(() => this.onSelectTab(index));
      });
    }
  }

  public onSelectTab = (index: number): void => {
    this.selectedIndex.set(index);

    setTimeout(() => {
      if (this.tabList().length > 0) {
        this.tabList().forEach((tab, i) => tab.linkedSelected.set(i === index));
      }
    });
  };

  private _effect$ = effect(() => {
    if (this.tabList().length > 0) {
      this.tabList().forEach((tab, i) =>
        tab.linkedSelected.set(
          i === (+this.selectedIndex() >= 0 ? +this.selectedIndex() : 0)
        )
      );
    }
  });
}
