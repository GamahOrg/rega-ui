import { NgClass } from "@angular/common";
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  viewChild,
  ViewContainerRef,
  WritableSignal,
} from "@angular/core";
import { Overlay, OverlayRef, OverlayConfig } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";

import { Animations } from "../../../utils";

@Component({
  selector: "rega-menu",
  imports: [NgClass],
  templateUrl: "./menu.component.html",
  exportAs: "regaMenu",
  animations: [Animations],
})
export class Menu {
  readonly #overlay = inject(Overlay);
  readonly #viewContainerRef = inject(ViewContainerRef);

  private readonly _templateRef = viewChild<ElementRef<any> | undefined>("menuTemplate");

  private readonly _menuContentRef = viewChild<ElementRef<HTMLElement>>("menuContent");

  public readonly keepOpenOnItemsClicked: InputSignal<boolean> = input(false);

  public readonly hasBackdrop: InputSignal<boolean> = input(true);

  public readonly menuClass: InputSignal<string> = input("");

  public readonly onOpen: OutputEmitterRef<void> = output();

  public readonly onClose: OutputEmitterRef<void> = output();

  public readonly isOpen: WritableSignal<boolean> = signal(false);

  public readonly classes: Signal<string[]> = computed(() => [
    "rega-menu",
    this.isOpen() ? "visible" : "",
    this.menuClass(),
  ]);

  private readonly _overlayRef: WritableSignal<OverlayRef | null> = signal(null);

  public open = (trigger: HTMLElement): void => {
    if (!this._overlayRef()) {
      const positionStrategy = this.#overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions([
          {
            originX: "start",
            originY: "bottom",
            overlayX: "start",
            overlayY: "top",
          },
          {
            originX: "start",
            originY: "top",
            overlayX: "start",
            overlayY: "bottom",
          },
        ])
        .withFlexibleDimensions(true)
        .withPush(true);

      const config = new OverlayConfig({
        hasBackdrop: this.hasBackdrop(),
        backdropClass: "cdk-overlay-transparent-backdrop",
        positionStrategy,
        scrollStrategy: this.#overlay.scrollStrategies.close(),
      });

      this._overlayRef.set(this.#overlay.create(config));

      this._overlayRef()
        ?.backdropClick()
        .subscribe(() => this.close());
    }

    const portal = new TemplatePortal(this._templateRef() as any, this.#viewContainerRef);
    this._overlayRef()?.attach(portal);
    document.addEventListener("click", this._onDocumentClick, true);

    this.isOpen.set(true);
    this.onOpen.emit();
  };

  public close = (): void => {
    if (this._overlayRef()) this._overlayRef()?.detach();
    document.removeEventListener("click", this._onDocumentClick, true);

    this.isOpen.set(false);
    this.onClose.emit();
  };

  public toggle = (trigger: HTMLElement): void => {
    this.isOpen() ? this.close() : this.open(trigger);
  };

  private readonly _onDocumentClick = (event: MouseEvent): void => {
    const menuEl = this._menuContentRef()?.nativeElement;
    const target = event.target as Node;
    if (menuEl?.contains(target)) {
      const clickedEl = event.target as HTMLElement;
      const isExplicitClose =
        clickedEl.closest("[data-menu-close], .menu-close") !== null;
      // If clicked inside menu
      if (this.keepOpenOnItemsClicked() && !isExplicitClose) {
        // Prevent closing
        event.stopPropagation();
        return;
      }
    }

    // Otherwise close
    this.close();
  };
}
