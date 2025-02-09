import { CommonModule } from "@angular/common";
import {
  Component,
  contentChild,
  effect,
  inject,
  input,
  InputSignal,
  linkedSignal,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { from, take } from "rxjs";

import { ButtonComponent } from "../rega-button/rega-button.component";
import { BreadcrumbService } from "../../../services";
import { BreadcrumbItem, SizeType, SizeEnum, Breadcrumb } from "../../../utils";

@Component({
  selector: "rega-breadcrumb",
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: "./rega-breadcrumb.component.html",
})
export class RegaBreadcrumbComponent {
  readonly #router = inject(Router);
  readonly #breadcrumbService = inject(BreadcrumbService);

  public breadcrumbBtn = contentChild<any | undefined>("breadcrumbBtn");

  public divider = contentChild<any | undefined>("divider");

  public items: InputSignal<BreadcrumbItem[]> = input.required({
    transform: (items: BreadcrumbItem[]) =>
      items.length <= 5
        ? items
        : [
            items[0],
            { label: "...", link: "/", disabled: true },
            items[items.length - 2],
            items[items.length - 1],
          ],
  });
  public linkedItems = linkedSignal(() => this.items());

  public size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);
  public linkedSize = linkedSignal(() => this.size());

  public breadcrumbClass: InputSignal<string> = input("");
  public linkedBreadcrumbClass = linkedSignal(() => this.breadcrumbClass());

  public btnClass: InputSignal<string> = input("");
  public linkedBtnClass = linkedSignal(() => this.btnClass());

  public readonly SizeEnum = SizeEnum;

  public onNavigate = (path: string): void => {
    from(this.#router.navigate([path]))
      .pipe(take(1))
      .subscribe();
  };

  $effect = effect(() => {
    if (!!this.#breadcrumbService.breadcrumb()) {
      const { items, size, btnClass, breadcrumbClass } =
        this.#breadcrumbService.breadcrumb() as Breadcrumb;

      items.length && this.linkedItems.set(items);
      size && this.linkedSize.set(size);
      btnClass && this.linkedBtnClass.set(btnClass);
      breadcrumbClass && this.linkedBreadcrumbClass.set(breadcrumbClass);
    }
  });
}
