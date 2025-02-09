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
  signal,
  Signal,
  WritableSignal,
} from "@angular/core";

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  CdkDragPreview,
} from "@angular/cdk/drag-drop";

import { TableModule } from "primeng/table";

import { GStatic, TableLazyLoadEvent } from "../../../utils";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "rega-table",
  imports: [CommonModule, DragDropModule, CdkDragPreview, TableModule, SkeletonModule],
  templateUrl: "./table.component.html",
})
export class TableComponent {
  public data: ModelSignal<any[]> = model([] as any);

  public readonly lazy: InputSignal<boolean> = input(false);

  public readonly colSpan: InputSignal<number> = input(1);

  public readonly rowsCount: InputSignal<number> = input(1);

  public readonly virtualScrollItemSize: InputSignal<number> = input(32);

  public readonly scrollHeight: InputSignal<string> = input("flex");

  public readonly extendable: InputSignal<boolean> = input(false);

  public readonly reorder: InputSignal<boolean> = input(false);

  public readonly contained: InputSignal<boolean> = input(false);

  public readonly columnDivider: InputSignal<boolean> = input(false);

  public readonly alternatingRows: InputSignal<boolean> = input(false);

  public readonly loading: InputSignal<boolean> = input(false);

  public readonly emptyMessage: InputSignal<string> = input("No data found!");

  public readonly tableClass: InputSignal<string> = input("");

  public readonly onRowClick: OutputEmitterRef<any> = output();

  public readonly onLazyLoad: OutputEmitterRef<TableLazyLoadEvent> = output();

  public readonly bodyTemp = contentChild<any | undefined>("bodyTemp");

  public readonly extendableArea = contentChild<any | undefined>("extendableArea");

  public readonly headerTemp = contentChild<any | undefined>("headerTemp");

  public readonly footerTemp = contentChild<any | undefined>("footerTemp");

  public readonly emptyMessageTemp = contentChild<any | undefined>("emptyMessageTemp");

  readonly #expandedRows: WritableSignal<number[]> = signal([]);

  public readonly isExpanded = (i: number): boolean => this.#expandedRows().includes(i);

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = [
      "rega-table",
      this.extendable() ? "rega-table--extendable" : "",
      this.contained() ? "rega-table--contained" : "",
      this.columnDivider() ? "rega-table--divider" : "",
      this.alternatingRows() ? "rega-table--alternate" : "",
      this.tableClass(),
    ];

    return classes.filter(Boolean);
  });

  public onExpandRow = (row: any): void => {
    this.onRowClick.emit(row);

    const rowIndex: number = this.data().findIndex((r: any) => GStatic.isEqual(r, row));
    const index: number = this.#expandedRows().findIndex((i: number) => i === rowIndex);

    index >= 0
      ? this.#expandedRows().splice(index, 1)
      : this.#expandedRows().push(rowIndex);
  };

  public drop = (event: CdkDragDrop<any[]>): void => {
    moveItemInArray(this.data(), event.previousIndex, event.currentIndex);
  };
}
