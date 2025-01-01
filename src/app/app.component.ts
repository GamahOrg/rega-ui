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
  CheckboxComponent,
  FileUploadComponent,
} from "projects/rega-ui-material/src/lib";
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
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #breadcrumbService = inject(BreadcrumbService);

  public control: UntypedFormControl = this.#fb.control(true);

  public formGroup = this.#fb.group({
    control: [null, [Validators.required]],
  });

  title = "rega-ui";

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

    this.#breadcrumbService.breadcrumb.set({
      items: this.items,
    });
  }

  public onFileChange = (files: any): void => {
    console.log("🚀 ~ AppComponent ~ files:", files);
  };
}
