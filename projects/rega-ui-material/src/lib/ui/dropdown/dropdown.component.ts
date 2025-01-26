import { NgClass, NgTemplateOutlet } from "@angular/common";
import {
  Component,
  contentChild,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  viewChild,
  WritableSignal,
} from "@angular/core";
import { ScrollToSelectedDirective } from "../../../utils";

@Component({
  selector: "custom-dropdown",
  imports: [NgClass, NgTemplateOutlet, ScrollToSelectedDirective],
  templateUrl: "./dropdown.component.html",
})
export class CustomDropdownComponent {
  readonly #elementRef = inject(ElementRef);

  public readonly optionTemp = contentChild<any | undefined>("optionTemp");

  public readonly overlayContainer = viewChild("overlayContainer", { read: ElementRef });

  public readonly options: InputSignal<any[]> = input.required();

  public readonly label: InputSignal<string> = input("");

  public readonly dropdownClass: InputSignal<string> = input(
    "border rounded cursor-pointer flex justify-between items-center px-3 py-2 border-solid border-[#ccc]"
  );

  public readonly overlayClass: InputSignal<string> = input("");

  public readonly isOpen: WritableSignal<boolean> = signal(false);

  public readonly onChange: OutputEmitterRef<any> = output();

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent): void {
    if (!this.#elementRef.nativeElement.contains(event.target)) this.isOpen.set(false);
  }
}
