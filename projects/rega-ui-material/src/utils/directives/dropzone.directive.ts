import { Directive, HostListener, output, OutputEmitterRef } from "@angular/core";

@Directive({ selector: "[regaDropzone]" })
export class DropzoneDirective {
  public readonly fileDropped: OutputEmitterRef<FileList> = output();

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("Drag Over");
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("Drag Leave");
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    const files: FileList = evt.dataTransfer.files;
    if (files.length > 0) this.fileDropped.emit(files);
  }
}
