import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

import { Menu } from "../../lib/components";

@Directive({ selector: "[menuTriggerFor]", exportAs: "menuTriggerFor" })
export class MenuDirective {
  readonly #el = inject(ElementRef);

  public readonly menu = input.required<Menu>({ alias: "menuTriggerFor" });

  @HostListener("click")
  public toggle(): void {
    this.menu().toggle(this.#el.nativeElement);
  }
}
