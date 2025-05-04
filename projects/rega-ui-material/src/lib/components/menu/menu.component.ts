import { NgClass } from "@angular/common";
import {
  Component,
  computed,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Renderer2,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from "@angular/core";

import { Animations, GStatic } from "../../../utils";

@Component({
  selector: "rega-menu",
  imports: [NgClass],
  templateUrl: "./menu.component.html",
  exportAs: "regaMenu",
  animations: [Animations],
})
export class Menu {
  readonly #renderer = inject(Renderer2);
  readonly #el = inject(ElementRef);

  @HostBinding("class") public component = "fixed";

  public readonly menuContainer = viewChild<ElementRef | undefined>("menuContainer");

  public readonly keepOpenOnItemsClicked: InputSignal<boolean> = input(false);

  public readonly menuClass: InputSignal<string> = input("");

  public readonly onOpen: OutputEmitterRef<void> = output();

  public readonly onClose: OutputEmitterRef<void> = output();

  public readonly isOpen: WritableSignal<boolean> = signal(false);

  public readonly menuDir: WritableSignal<"up" | "down"> = signal("down");

  public readonly menuAlign: WritableSignal<"left" | "right"> = signal("left");

  public readonly classes: Signal<string[]> = computed(() => [
    "rega-menu",
    this.menuDir() === "down" ? "top-full " : "bottom-full",
    this.menuAlign() === "right" ? "end-0" : "start-0",
    this.menuClass(),
  ]);

  public readonly id: Signal<string> = signal(GStatic.uniqueId);

  public readonly wrapper: WritableSignal<HTMLElement | null> = signal(null);

  @HostListener("document:click", ["$event"])
  protected onClick(event: MouseEvent): void {
    const menuBtn = document.querySelector(`[data-menu-id="${this.id()}"]`);

    if (this.isOpen() && !menuBtn?.contains(event.target as Node)) {
      const menuContainer = this.menuContainer()?.nativeElement;
      if (
        this.keepOpenOnItemsClicked() &&
        menuContainer?.contains(event.target as Node)
      ) {
        return;
      }

      this.isOpen.set(false);
      this.onClose.emit();
    }
  }

  @HostListener("document:keydown.escape")
  protected onEscape(): void {
    this.isOpen.set(false);
    this.onClose.emit();
  }

  @HostListener("window:resize")
  protected onResize(): void {
    if (this.isOpen()) this._calculateMenuDir();
  }

  public toggleMenu(): void {
    this.isOpen.set(!this.isOpen());

    if (this.isOpen()) {
      this._calculateMenuDir();
      this._createWrapperAndMoveElements();
    } else this.onClose.emit();
  }

  private _calculateMenuDir = (): void => {
    const menuBtn = document.querySelector(`[data-menu-id="${this.id()}"]`);
    setTimeout(() => {
      const menuContainer = this.menuContainer()?.nativeElement;
      if (menuBtn instanceof HTMLElement && menuContainer) {
        const toggleRect = menuBtn.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const spaceBelow = viewportHeight - toggleRect.bottom;
        const spaceRight = viewportWidth - toggleRect.left;
        const menuHeight = menuContainer.offsetHeight + menuBtn.offsetHeight;
        const menuWidth = menuContainer.offsetWidth;

        this.menuDir.set(
          spaceBelow < menuHeight && toggleRect.top > menuHeight ? "up" : "down"
        );

        this.menuAlign.set(
          spaceRight < menuWidth && toggleRect.right > menuWidth ? "right" : "left"
        );
      }
    });
  };

  private _createWrapperAndMoveElements = (): void => {
    this.onOpen.emit();

    const parentElement = this.#el.nativeElement.parentElement;
    if (parentElement && !this.wrapper()) {
      this.wrapper.set(this.#renderer.createElement("div"));
      this.wrapper()!.classList.add(`menu-wrapper-${this.id()}`);
      this.#renderer.setStyle(this.wrapper(), "position", "relative");

      this.#renderer.insertBefore(parentElement, this.wrapper(), this.#el.nativeElement);

      const button = document.querySelector(`[data-menu-id="${this.id()}"]`);
      if (button) this.#renderer.appendChild(this.wrapper(), button);
      this.#renderer.appendChild(this.wrapper(), this.#el.nativeElement);
    }
  };
}
