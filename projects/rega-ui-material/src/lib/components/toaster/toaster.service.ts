import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
} from "@angular/core";
import { Toaster } from "./toaster.component";

@Injectable()
export class ToasterService {
  private toastContainer: HTMLElement;
  private readonly environmentInjector = inject(EnvironmentInjector);

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.toastContainer = document.createElement("div");
    this.toastContainer.className = "toast-container";
    document.body.appendChild(this.toastContainer);
  }

  show(
    message: string,
    type: "success" | "error" | "warning" | "info" = "success"
  ): void {
    const componentRef = createComponent(Toaster, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector,
    });

    componentRef.instance.message.set(message);
    componentRef.instance.type.set(type);

    this.appRef.attachView(componentRef.hostView);
    this.toastContainer.appendChild(componentRef.location.nativeElement);

    setTimeout(() => {
      this.toastContainer.removeChild(componentRef.location.nativeElement);
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 3000);
  }
}
