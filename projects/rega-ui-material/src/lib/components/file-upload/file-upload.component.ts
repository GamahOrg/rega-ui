import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  InputSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  BaseFormValueAccessorComponent,
  FileState,
  FilesListItem,
  SizeEnum,
  SizeType,
} from "../../../utils";

import { UploadFilesService } from "../../../services";

import { RegaButtonComponent } from "../rega-button/rega-button.component";
import { MatIconModule } from "@angular/material/icon";
import { FileListComponent } from "../../ui";

@Component({
  selector: "rega-file-upload",
  imports: [CommonModule, MatIconModule, RegaButtonComponent, FileListComponent],
  templateUrl: "./file-upload.component.html",
  providers: [
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

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public btnSize: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public btnLoading: InputSignal<boolean> = input(false);

  public btn: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public btnClass: InputSignal<string> = input("upload-file");

  public onSelectFiles: OutputEmitterRef<File[]> = output();

  public selectedFiles: WritableSignal<FilesListItem[]> = signal([]);

  public ngOnChanges(): void {
    this.#uploadFilesService.selectedFiles = this.selectedFiles;
    this.#uploadFilesService.multiple.set(this.multiple());
    this.#uploadFilesService.accept.set(this.accept());
    this.#uploadFilesService.sizeLimit.set(this.sizeLimit());
  }

  public selectFile(event: any, files: FileList | null | undefined): void {
    this.#uploadFilesService.selectFile(files);
    event.target.value = null;
  }

  public removeFile = (file: FilesListItem): void => {
    this.#uploadFilesService.removeFile(file);
  };

  private _effect$ = effect(() => {
    const result: File[] = this.selectedFiles()
      .filter(({ type }) => type === FileState.SUCCESS)
      .map((f) => f.file);

    console.log("🚀 ~ _effect$=effect ~ this.selectedFiles():", this.selectedFiles());
    console.log("🚀 ~ _effect$=effect ~ result:", result);
    this.value = result;
    this.onChange(result);
    this.onSelectFiles.emit(result);
  });
}
