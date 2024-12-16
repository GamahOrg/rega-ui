import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "lib-rega-button",
  imports: [CommonModule],
  templateUrl: "./rega-button.component.html",
  styleUrl: "./rega-button.component.css",
})
export class RegaButtonComponent {
  @Input()
  primary = true;

  /** What background color to use */
  @Input()
  backgroundColor?: string;

  /** How large should the button be? */
  @Input()
  size: "small" | "medium" | "large" = "medium";

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = "Button";

  /** Optional click handler */
  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary
      ? "storybook-button--primary"
      : "storybook-button--secondary";

    return ["storybook-button", `storybook-button--${this.size}`, mode];
  }
}
