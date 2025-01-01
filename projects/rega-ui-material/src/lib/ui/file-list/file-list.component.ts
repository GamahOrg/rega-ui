import { Component, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { FilesListItem, FileState } from "../../../utils";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";

@Component({
  selector: "rega-file-list",
  imports: [NgClass, MatIconModule],
  templateUrl: "./file-list.component.html",
})
export class FileListComponent {
  public fileList: InputSignal<FilesListItem[]> = input([] as FilesListItem[]);

  public onRemoveFile: OutputEmitterRef<FilesListItem> = output();

  public readonly FileState = FileState;
}
