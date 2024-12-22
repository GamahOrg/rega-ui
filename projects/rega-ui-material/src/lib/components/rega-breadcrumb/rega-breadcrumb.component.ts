import { CommonModule } from "@angular/common";
import {
  Component,
  contentChild,
  effect,
  inject,
  input,
  InputSignal,
} from "@angular/core";
import {
  Breadcrumb,
  BreadcrumbItem,
  Direction,
  DirEnum,
  SizeEnum,
  SizeType,
} from "@rega-material/utils";
import { RegaButtonComponent } from "../rega-button/rega-button.component";
import { Router, RouterModule } from "@angular/router";
import { from, take } from "rxjs";
import { BreadcrumbService } from "@rega-material/services";

@Component({
  selector: "rega-breadcrumb",
  imports: [CommonModule, RouterModule, RegaButtonComponent],
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

  public size: InputSignal<SizeType> = input(SizeEnum.Medium as SizeType);

  public breadcrumbClass: InputSignal<string> = input("");

  public btnClass: InputSignal<string> = input("");

  public dir: InputSignal<Direction> = input(DirEnum.LTR as Direction);

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

      this.items().concat(items.length ? items : this.items());
      this.size().concat(size.length ? size : this.size());
      this.btnClass().concat(btnClass.length ? btnClass : this.btnClass());
      this.breadcrumbClass().concat(
        breadcrumbClass.length ? breadcrumbClass : this.breadcrumbClass()
      );
    }
  });
}
