import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  forwardRef,
  input,
  InputSignal,
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

import { RegaButtonComponent } from "../rega-button/rega-button.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "rega-file-upload",
  imports: [CommonModule, MatIconModule, RegaButtonComponent],
  templateUrl: "./file-upload.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent extends BaseFormValueAccessorComponent {
  public label: InputSignal<string> = input("Browse Files");

  public multiple: InputSignal<boolean> = input(false);

  public accept: InputSignal<string> = input("image/*,application/pdf");

  public sizeLimit: InputSignal<number> = input(2); //In MB

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public size: InputSignal<SizeType> = input(SizeEnum.Large as SizeType);

  public btnClass: InputSignal<string> = input("upload-file");

  public onSelectFiles: OutputEmitterRef<File[]> = output();

  public selectedFiles: WritableSignal<FilesListItem[]> = signal([]);

  public readonly FileState = FileState;

  public selectFile(event: any, files: FileList | null | undefined): void {
    const allFiles: File[] = files?.length ? Array.from(files) : [];
    const fileList: FilesListItem[] = this.selectedFiles();

    const _files = this._processFiles(allFiles, fileList, this._acceptTypesRegex());

    this._updateValues(this.multiple() ? _files : [_files[0]]);
    event.target.value = null;
  }

  public onRemoveFile = (file: FilesListItem): void => {
    const files = this.selectedFiles().filter((f) => f.file.name !== file.file.name);
    this._updateValues(files);
  };

  private _updateValues = (fileList: FilesListItem[]): void => {
    const res = fileList.filter((f) => f.type === FileState.SUCCESS).map((f) => f.file);

    this.selectedFiles.set(fileList);
    this.value = res;
    this.onChange(res);
    this.onSelectFiles.emit(this.value);
  };

  private _processFiles = (
    files: File[],
    fileList: FilesListItem[],
    acceptRegex: RegExp
  ): FilesListItem[] => {
    const result = [...fileList];

    for (const file of files) {
      if (fileList.some((f) => f.file.name.includes(file.name))) continue;

      if (file.size > this.sizeLimit() * 1024 * 1000)
        result.unshift(this._sizeErrorEntry(file));
      else if (!acceptRegex.test(file.type)) result.unshift(this._typeErrorEntry(file));
      else result.unshift({ file, type: FileState.SUCCESS });
    }

    return result;
  };

  private _acceptTypesRegex = (): RegExp => {
    return new RegExp(
      this.accept()
        .split(",")
        .map((type) => type.trim().replace("*", ".*"))
        .join("|")
    );
  };

  private _sizeErrorEntry(file: File): FilesListItem {
    return {
      file,
      type: FileState.MAX_SIZE,
      msg: `File "${file.name}" exceeds the maximum size of ${this.sizeLimit()} MB.`,
    };
  }

  private _typeErrorEntry(file: File): FilesListItem {
    return {
      file,
      type: FileState.INVALID_TYPE,
      msg: `File "${file.name}" has an invalid type. Accepted types: ${this.accept()}`,
    };
  }
}
