import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
} from "@angular/core";

import { Menu } from "../../lib/components";

@Directive({ selector: "[menuTriggerFor]" })
export class MenuDirective implements OnInit {
  readonly #el = inject(ElementRef);

  public readonly menu = input.required<Menu>({ alias: "menuTriggerFor" });

  @HostListener("click")
  protected toggleMenu(): void {
    if (this.menu()) this.menu().toggleMenu();
  }

  public ngOnInit(): void {
    const button = this.#el.nativeElement;
    button.setAttribute("data-menu-id", this.menu().id());
  }
}
