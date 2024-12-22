import { Injectable, signal, WritableSignal } from "@angular/core";
import { Breadcrumb } from "@rega-material/utils";

@Injectable({ providedIn: "root" })
export class BreadcrumbService {
  public breadcrumb: WritableSignal<Breadcrumb | undefined> = signal(undefined);
}
