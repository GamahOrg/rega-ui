import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  input,
  InputSignal,
  linkedSignal,
  Signal,
} from "@angular/core";
import { initFlowbite } from "flowbite";
import {
  ButtonType,
  SizeType,
  SizeEnum,
  ButtonVariantType,
  ButtonVariantEnum,
  ColorType,
  ColorEnum,
} from "../../../utils";
import {
  IsActiveMatchOptions,
  Params,
  QueryParamsHandling,
  RouterLink,
  RouterLinkActive,
  UrlTree,
} from "@angular/router";

@Component({
  selector: "rega-button",
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./rega-button.component.html",
})
export class ButtonComponent implements AfterViewInit {
  public readonly label: InputSignal<string> = input("");

  public readonly buttonType: InputSignal<ButtonType> = input("button" as ButtonType);

  public readonly color: InputSignal<ColorType> = input(ColorEnum.Primary as ColorType);

  public readonly size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);

  public readonly variant: InputSignal<ButtonVariantType> = input(
    ButtonVariantEnum.Contained as ButtonVariantType
  );

  public readonly loading: InputSignal<boolean> = input(false);

  public readonly disabled: InputSignal<boolean> = input(false);

  public readonly routerLink: InputSignal<string | any[] | UrlTree | null | undefined> =
    input();

  public readonly routerLinkActive: InputSignal<string | string[]> = input(
    "" as string | string[]
  );

  public readonly routerLinkActiveOptions: InputSignal<
    { exact: boolean } | IsActiveMatchOptions
  > = input({ exact: false } as { exact: boolean } | IsActiveMatchOptions);

  public readonly queryParams: InputSignal<Params | null | undefined> = input();

  public readonly queryParamsHandling: InputSignal<
    QueryParamsHandling | null | undefined
  > = input("merge" as QueryParamsHandling | null | undefined);

  public readonly btnClass: InputSignal<string> = input("");

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-btn",
      `rega-btn--${this.color()}`,
      `rega-btn--${this.size()}`,
      `rega-btn--${this.variant()}`,
      this.btnClass(),
    ];
    if (this.disabled() || this.loading()) classes.push("rega-btn--disabled");
    return classes.filter(Boolean);
  });

  public ngAfterViewInit(): void {
    initFlowbite();
  }
}
