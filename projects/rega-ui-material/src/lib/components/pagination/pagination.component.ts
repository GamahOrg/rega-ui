import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  contentChild,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  Signal,
} from "@angular/core";
import { SizeEnum, SizeType } from "../../../utils";
import { CustomDropdownComponent } from "../../ui";
import { ButtonComponent } from "../rega-button/rega-button.component";

@Component({
  selector: "rega-pagination",
  imports: [CommonModule, CustomDropdownComponent, ButtonComponent],
  templateUrl: "./pagination.component.html",
})
export class PaginationComponent {
  public readonly previousTemp = contentChild<any | undefined>("previousTemp");

  public readonly nextTemp = contentChild<any | undefined>("nextTemp");

  public readonly numberTemp = contentChild<any | undefined>("numberTemp");

  public readonly count: InputSignal<number> = input(0);

  public readonly currentPage: ModelSignal<number> = model(1);

  public readonly siblingCount: InputSignal<number> = input(1);

  public readonly size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public readonly paginationClass: InputSignal<string> = input("");

  public readonly onPageChange: OutputEmitterRef<number> = output();

  public pages = computed(() =>
    Array.from({ length: this.count() }, (_, i) => ({ index: i + 1 }))
  );

  public readonly pageList = computed(() => {
    if (this.count() === 1) return [1];

    const center: number[] = Array.from(
        { length: this.siblingCount() * 2 + 1 },
        (_, i) => this.currentPage() - this.siblingCount() + i
      ),
      filteredCenter = center.filter((p) => p > 1 && p < this.count()),
      includeThreeLeft = this.currentPage() === this.siblingCount() + 3,
      includeThreeRight = this.currentPage() === this.count() - (this.siblingCount() + 2),
      includeLeftDots = this.currentPage() > this.siblingCount() + 3,
      includeRightDots = this.currentPage() < this.count() - (this.siblingCount() + 2);

    if (includeThreeLeft) filteredCenter.unshift(2);
    if (includeThreeRight) filteredCenter.push(this.count() - 1);

    if (includeLeftDots) filteredCenter.unshift(-1);
    if (includeRightDots) filteredCenter.push(-1);

    return [1, ...filteredCenter, this.count()];
  });

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = [
      "rega-pagination",
      `rega-pagination--${this.size()}`,
      this.paginationClass(),
    ];

    return classes.filter(Boolean);
  });

  public pageChange = (page: number): void => {
    console.log(this.pages());
    if (page !== this.currentPage()) {
      this.currentPage.set(page);
      this.onPageChange.emit(page);
    }
  };
}
