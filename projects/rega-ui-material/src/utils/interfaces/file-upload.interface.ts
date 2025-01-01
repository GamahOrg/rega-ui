import { FileState } from "../enums";

export interface FileError {
  type: FileState;
  message: string;
}

export interface FilesListItem {
  file: File;
  type: FileState;
  msg?: string;
}
