import { Injectable, signal, WritableSignal } from "@angular/core";
import { FilesListItem, FileState } from "../utils";

@Injectable()
export class UploadFilesService {
  public selectedFiles: WritableSignal<FilesListItem[]> = signal([]);

  public multiple: WritableSignal<boolean> = signal(true);
  public accept: WritableSignal<string> = signal("");
  public sizeLimit: WritableSignal<number> = signal(0); //In MB

  public selectFile = (files: FileList | null | undefined): void => {
    const allFiles: File[] = files?.length ? Array.from(files) : [];
    const fileList: FilesListItem[] = this.selectedFiles();

    const _files = this._processFiles(allFiles, fileList, this._acceptTypesRegex());

    this.selectedFiles.set(this.multiple() ? _files : [_files[0]]);
  };

  public removeFile = (file: FilesListItem): void => {
    this.selectedFiles.update((files) =>
      files.filter((f) => f.file.name !== file.file.name)
    );
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
    if (!this.accept()) return /.*/;

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
      msg: `File exceeds the maximum size of ${this.sizeLimit()} MB.`,
    };
  }

  private _typeErrorEntry(file: File): FilesListItem {
    return {
      file,
      type: FileState.INVALID_TYPE,
      msg: `File has an invalid type. Accepted types: ${this.accept()}`,
    };
  }
}
