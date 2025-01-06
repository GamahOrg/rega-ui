import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
  BreadcrumbItem,
  BreadcrumbService,
  RegaBreadcrumbComponent,
} from "rega-material-ui";

import { TextInputComponent } from "projects/rega-ui-material/src/lib/components/text-input/text-input.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { TextAreaComponent } from "projects/rega-ui-material/src/lib/components/textarea/textarea.component";
import {
  CardComponent,
  CheckboxComponent,
  DropZoneComponent,
  FileUploadComponent,
  RadioButtonComponent,
  RadioGroupComponent,
} from "projects/rega-ui-material/src/lib";
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RegaBreadcrumbComponent,
    TextInputComponent,
    TextAreaComponent,
    CheckboxComponent,
    FileUploadComponent,
    DropZoneComponent,
    RadioGroupComponent,
    RadioButtonComponent,
    CardComponent,
    AutoCompleteModule 
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #breadcrumbService = inject(BreadcrumbService);

  // public radio: string = "2";
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

  title = "rega-ui";
  
  autoCompleteItems: any[] = [];

  value: any;

  search(event: AutoCompleteCompleteEvent) {
      this.autoCompleteItems = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  public items: BreadcrumbItem[] = [
    { label: "Link 1", link: "/link1" },
    { label: "Link 2", link: "/link2" },
    { label: "Link 3", link: "/link3", disabled: true },
    { label: "Link 4", link: "/link4" },
    { label: "Link 5", link: "/link5" },
  ];

  public ngOnInit(): void {
    this.control.valueChanges.subscribe((res) => {
      console.log("🚀 ~ AppComponent ~ this.control.valueChanges.subscribe ~ res:", res);
      // console.log("Values: ", res);
    });

    this.radio.valueChanges.subscribe((res) => {
      console.log("🚀 ~ AppComponent ~ this.control.valueChanges.subscribe ~ res:", res);
      // console.log("Values: ", res);
    });

    this.selectionGroup.valueChanges.subscribe((res) => {
      console.log(
        "🚀 ~ AppComponent ~ this.selectionGroup.valueChanges.subscribe ~ res:",
        res
      );
      // console.log("Values: ", res);
    });

    this.#breadcrumbService.breadcrumb.set({
      items: this.items,
    });
  }

  public onFileChange = (files: any): void => {
    console.log("🚀 ~ AppComponent ~ files:", files);
  };
}
