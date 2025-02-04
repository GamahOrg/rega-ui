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

@Component({
  selector: "rega-button",
  imports: [CommonModule],
  templateUrl: "./rega-button.component.html",
})
export class RegaButtonComponent implements AfterViewInit {
  public label: InputSignal<string> = input.required();

  public buttonType: InputSignal<ButtonType> = input("button" as ButtonType);

  public color: InputSignal<ColorType> = input(ColorEnum.Primary as ColorType);

  public size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);

  public variant: InputSignal<ButtonVariantType> = input(
    ButtonVariantEnum.Contained as ButtonVariantType
  );

  public loading: InputSignal<boolean> = input(false);

  public disabled: InputSignal<boolean> = input(false);

  public btnClass: InputSignal<string> = input("");

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
