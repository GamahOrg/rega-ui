import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import {
  BreadcrumbItem,
  BreadcrumbService,
  RegaBreadcrumbComponent,
} from "rega-material-ui";

import { TextInputComponent } from "projects/rega-ui-material/src/lib/components/text-input/text-input.component";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { TextAreaComponent } from "projects/rega-ui-material/src/lib/components/textarea/textarea.component";
import {
  AutocompleteComponent,
  CardComponent,
  CheckboxComponent,
  DropdownComponent,
  DropZoneComponent,
  FileUploadComponent,
  RadioButtonComponent,
  RadioGroupComponent,
  TableComponent,
} from "projects/rega-ui-material/src/lib";
import { AutoCompleteModule } from "primeng/autocomplete";
import { Option } from "projects/rega-ui-material/src/utils/interfaces";
import { LazyLoadingEvent } from "dist/rega-ui-material/public-api";
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // RegaBreadcrumbComponent,
    // TextInputComponent,
    TextAreaComponent,
    CheckboxComponent,
    FileUploadComponent,
    DropZoneComponent,
    RadioGroupComponent,
    RadioButtonComponent,
    CardComponent,
    AutoCompleteModule,
    AutocompleteComponent,
    DropdownComponent,
    TableComponent,
    DragDropModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #breadcrumbService = inject(BreadcrumbService);

  // public radio: string = "2";
  public autocomplete: UntypedFormControl = this.#fb.nonNullable.control(
    [0],
    [Validators.required]
  );
  public radio: UntypedFormControl = this.#fb.control({ value: 2, disabled: false });
  public controlArea: UntypedFormControl = this.#fb.control(null);
  public control: UntypedFormControl = this.#fb.control(true);

  public formGroup = this.#fb.group({
    control: [null, [Validators.required]],
  });

  public selectionGroup = this.#fb.group({
    selection1: [null],
    selection2: [null],
  });

  public options: WritableSignal<any[]> = signal([]);
  public data: WritableSignal<any[]> = signal([]);

  public optionsLoaded: WritableSignal<boolean> = signal(true);
  title = "rega-ui";

  public items: BreadcrumbItem[] = [
    { label: "Link 1", link: "/link1" },
    { label: "Link 2", link: "/link2" },
    { label: "Link 3", link: "/link3", disabled: true },
    { label: "Link 4", link: "/link4" },
    { label: "Link 5", link: "/link5" },
  ];

  public ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.options().push({ label: "Item label " + i, id: i });
    }

    this.data.set(
      Array.from({ length: 12 }, (_, id) => ({ id, label: "Item label " + id }))
    );

    // for (let i = 0; i < 4; i++) this.options().push("Item label " + i);

    this.autocomplete.valueChanges.subscribe((res) => {
      console.log(
        "🚀 ~ AppComponent ~ this.autocomplete.valueChanges.subscribe ~ res:",
        res
      );
    });

    this.control.valueChanges.subscribe((res) => {
      console.log("🚀 ~ AppComponent ~ this.control.valueChanges.subscribe ~ res:", res);
    });

    this.radio.valueChanges.subscribe((res) => {
      console.log("🚀 ~ AppComponent ~ this.control.valueChanges.subscribe ~ res:", res);
    });

    this.selectionGroup.valueChanges.subscribe((res) => {
      console.log(
        "🚀 ~ AppComponent ~ this.selectionGroup.valueChanges.subscribe ~ res:",
        res
      );
    });

    this.#breadcrumbService.breadcrumb.set({
      items: this.items,
    });
  }

  public drop = (event: CdkDragDrop<any[]>): void => {
    moveItemInArray(this.data(), event.previousIndex, event.currentIndex);
  };

  public onSearch = (event: string): void => {
    this.optionsLoaded.set(false);
    setTimeout(() => {
      const options: Option[] = [];
      for (let i = 0; i < 10; i++) {
        options.push({ label: "Item label " + i, id: i });
      }
      this.options.set(options);
      this.optionsLoaded.set(true);
    }, 300);
  };

  public onFileChange = (files: any): void => {
    console.log("🚀 ~ AppComponent ~ files:", files);
  };
}
