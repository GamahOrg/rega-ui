import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  InputSignal,
  linkedSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  WritableSignal,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  BaseFormValueAccessorComponent,
  DropzoneDirective,
  FileState,
  FilesListItem,
  SizeEnum,
  SizeType,
} from "../../../utils";

import { UploadFilesService } from "../../../services";

import { ButtonComponent } from "../rega-button/rega-button.component";
import { MatIconModule } from "@angular/material/icon";
import { FileListComponent } from "../../ui";

@Component({
  selector: "rega-file-upload",
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent,
    FileListComponent,
    DropzoneDirective,
  ],
  templateUrl: "./file-upload.component.html",
  providers: [
    UploadFilesService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent
  extends BaseFormValueAccessorComponent
  implements OnChanges
{
  readonly #uploadFilesService = inject(UploadFilesService);

  public label: InputSignal<string> = input("Browse Files");

  public multiple: InputSignal<boolean> = input(true);

  public accept: InputSignal<string> = input("image/*,application/pdf");

  public sizeLimit: InputSignal<number> = input(2); //In MB

  public draggable: InputSignal<boolean> = input(false);

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public btnSize: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public btnLoading: InputSignal<boolean> = input(false);

  public btn: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public btnClass: InputSignal<string> = input("upload-file");

  public onSelectFiles: OutputEmitterRef<File[]> = output();

  public selectedFiles: WritableSignal<FilesListItem[]> =
    this.#uploadFilesService.selectedFiles;

  public ngOnChanges(): void {
    this.#uploadFilesService.multiple = linkedSignal(() => this.multiple());
    this.#uploadFilesService.accept = linkedSignal(() => this.accept());
    this.#uploadFilesService.sizeLimit = linkedSignal(() => this.sizeLimit());
  }

  public selectFile(event: any, files: FileList | null | undefined): void {
    this.#uploadFilesService.selectFile(files);
    if (event) event.target.value = null;
  }

  public removeFile = (file: FilesListItem): void => {
    this.#uploadFilesService.removeFile(file);
  };

  private _effect$ = effect(() => {
    const result: File[] = this.selectedFiles()
      .filter(({ type }) => type === FileState.SUCCESS)
      .map((f) => f.file);

    this.value = result;
    this.onChange(result);
    if (result.length) this.onSelectFiles.emit(result);
  });
}
