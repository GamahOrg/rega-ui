import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, Signal, signal, WritableSignal } from "@angular/core";
import { BreadcrumbItem, BreadcrumbService } from "rega-material-ui";

import { TextInputComponent } from "projects/rega-ui-material/src/lib/components/text-input/text-input.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { TextAreaComponent } from "projects/rega-ui-material/src/lib/components/textarea/textarea.component";
import {
  AutocompleteComponent,
  ButtonComponent,
  CardComponent,
  CheckboxComponent,
  DropdownComponent,
  DropZoneComponent,
  FileUploadComponent,
  ModalComponent,
  // ModalTestComponent,
  PaginationComponent,
  ProgressIndicatorComponent,
  RadioButtonComponent,
  RadioGroupComponent,
  TableComponent,
} from "projects/rega-ui-material/src/lib";
import { AutoCompleteModule } from "primeng/autocomplete";
import { IndicatorStep, Option } from "projects/rega-ui-material/src/utils/interfaces";
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { ModalService } from "projects/rega-ui-material/src/services";
import { tap } from "rxjs/operators";
import { ModalAlignEnum } from "projects/rega-ui-material/src/utils";
import { ModalTestComponent } from "../modal-test/modal-test.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // RegaBreadcrumbComponent,
    TextInputComponent,
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
    PaginationComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #breadcrumbService = inject(BreadcrumbService);
  readonly #modalService = inject(ModalService);

  public readonly textInput: FormControl<string> = this.#fb.nonNullable.control("", [
    Validators.required,
  ]);

  // public radio: string = "2";
  public autocomplete: UntypedFormControl = this.#fb.nonNullable.control(
    [0],
    [Validators.required]
  );
  public dropdown = 2;
  // public dropdown: UntypedFormControl = this.#fb.nonNullable.control("2", [
  //   Validators.required,
  // ]);
  public radio: UntypedFormControl = this.#fb.control({ value: 2, disabled: false });
  public controlArea: UntypedFormControl = this.#fb.control(null);
  public control: UntypedFormControl = this.#fb.control(true);

  public formGroup = this.#fb.group({
    control: [null, [Validators.required]],
  });

  public readonly userForm: FormGroup<any> = this.#fb.nonNullable.group({
    username: [
      "",
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    email: ["", [Validators.required, Validators.email]],
    role: ["", [Validators.required]],
  });

  public selectionGroup = this.#fb.group({
    selection1: [null],
    selection2: [null],
  });

  public steps: Signal<IndicatorStep[]> = signal(
    Array.from({ length: 4 }, (_, i) => ({
      title: `Strep ${i}`,
      description: `Description ${i}`,
    }))
  );

  public options: WritableSignal<any[]> = signal([]);
  public data: WritableSignal<any[]> = signal([]);

  public loading: WritableSignal<boolean> = signal(true);
  public optionsLoaded: WritableSignal<boolean> = signal(true);
  public roleList: Option[] = [
    { id: "1", label: "Role1" },
    { id: "2", label: "Role2" },
    { id: "3", label: "Role3" },
  ];

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

    setTimeout(() => {
      this.data.set(
        Array.from({ length: 12 }, (_, id) => ({ id, label: "Item label " + id }))
      );
      this.loading.set(false);
    }, 5000);

    // for (let i = 0; i < 4; i++) this.options().push("Item label " + i);

    this.autocomplete.valueChanges.subscribe((res) => {
      // console.log(
      //   "🚀 ~ AppComponent ~ this.autocomplete.valueChanges.subscribe ~ res:",
      //   res
      // );
    });

    this.control.valueChanges.subscribe((res) => {
      // console.log("🚀 ~ AppComponent ~ this.control.valueChanges.subscribe ~ res:", res);
    });

    this.radio.valueChanges.subscribe((res) => {
      // console.log("🚀 ~ AppComponent ~ this.control.valueChanges.subscribe ~ res:", res);
    });

    this.selectionGroup.valueChanges.subscribe((res) => {
      // console.log(
      //   "🚀 ~ AppComponent ~ this.selectionGroup.valueChanges.subscribe ~ res:",
      //   res
      // );
    });

    this.#breadcrumbService.breadcrumb.set({
      items: this.items,
    });

    // this.openModal();
  }

  public ngAfterViewInit(): void {
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();
  }

  public openModal = (): void => {
    this.#modalService
      .open(ModalTestComponent, {
        data: { title: "Modal Title", message: "Modal Content" },
        backdropClose: true,
        align: ModalAlignEnum.Start,
        width: "400px",
        height: "150px",
        // styleClasses: ["!bg-[#000]"],
      })
      .afterClosed()
      .pipe(tap(console.log))
      .subscribe();
  };

  dropdownChange = (event: unknown): void => {
    console.log("🚀 ~ AppComponent ~ event:", event);
  };

  public onPageChange = (page: number): void => {
    console.log("Page changed to:", page);
  };

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
    // console.log("🚀 ~ AppComponent ~ files:", files);
  };
}
