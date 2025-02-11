import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Type,
} from "@angular/core";
import { Observable, Subject, take } from "rxjs";
import { MODAL_DATA, ModalOptions } from "../utils";

@Injectable({ providedIn: "root" })
export class ModalService {
  readonly #appRef = inject(ApplicationRef);
  readonly #injector = inject(Injector);
  readonly #environmentInjector = inject(EnvironmentInjector);

  #componentRef: ComponentRef<any> | null = null;
  #afterCloseSubject: Subject<any> | null = null;

  public open = (
    component: Type<any>,
    options?: ModalOptions
  ): { afterClosed: () => Observable<any> } => {
    this.#afterCloseSubject = new Subject();
    // Create a custom injector to provide modal data
    const modalInjector = Injector.create({
      providers: [{ provide: MODAL_DATA, useValue: options?.data || null }],
      parent: this.#injector,
    });

    // Create component using modern API
    this.#componentRef = createComponent(component, {
      environmentInjector: this.#environmentInjector,
      elementInjector: modalInjector,
    });

    if (options?.width) {
      this.#componentRef.location.nativeElement.style.setProperty(
        "--modal-width",
        options.width
      );
    }

    if (options?.height) {
      this.#componentRef.location.nativeElement.style.setProperty(
        "--modal-height",
        options.height
      );
    }

    // Attach the component to the application
    this.#appRef.attachView(this.#componentRef?.hostView);
    this.#componentRef?.changeDetectorRef.detectChanges();

    // Append the component to the body
    const modalElement: HTMLElement = this.#componentRef.location.nativeElement;
    document.body.appendChild(modalElement);

    if (options?.data) Object.assign(this.#componentRef?.instance, options.data);
    if (options?.backdropClose) this._setupBackdropClose(modalElement);

    return { afterClosed: () => this.#afterCloseSubject!.pipe(take(1)) };
  };

  public close = (result?: any): void => {
    if (this.#componentRef) {
      this.#appRef.detachView(this.#componentRef.hostView);
      this.#componentRef.destroy();
      this.#componentRef = null;

      this.#afterCloseSubject!.next(result);
      this.#afterCloseSubject!.complete();
      this.#afterCloseSubject = new Subject();
    }
  };

  private _setupBackdropClose = (modalElement: HTMLElement): void => {
    const overlay = modalElement.querySelector(".modal-overlay") as HTMLElement;

    if (overlay) {
      overlay.addEventListener("click", (event: MouseEvent) => {
        if (event.target === overlay) this.close();
      });
    }
  };
}
