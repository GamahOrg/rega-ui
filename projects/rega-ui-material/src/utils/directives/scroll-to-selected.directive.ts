import { Directive, ElementRef, AfterViewInit, inject } from "@angular/core";

@Directive({ selector: "[scrollToSelected]" })
export class ScrollToSelectedDirective implements AfterViewInit {
  readonly #elementRef = inject(ElementRef);

  public ngAfterViewInit(): void {
    this.scrollToSelected();
  }

  public scrollToSelected = (): void => {
    const container = this.#elementRef.nativeElement;

    const option = container.querySelector(".selected");

    if (option) {
      const containerRect = container.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();

      const scrollTop = optionRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };
}
