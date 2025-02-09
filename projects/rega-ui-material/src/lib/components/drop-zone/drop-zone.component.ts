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
  Signal,
  WritableSignal,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ButtonComponent } from "../rega-button/rega-button.component";
import { UploadFilesService } from "../../../services";
import {
  BaseFormValueAccessorComponent,
  DropzoneDirective,
  FilesListItem,
  FileState,
  SizeEnum,
} from "../../../utils";
import { FileListComponent } from "../../ui";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
@Component({
  selector: "rega-drop-zone",
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent,
    FileListComponent,
    DropzoneDirective,
  ],
  templateUrl: "./drop-zone.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropZoneComponent),
      multi: true,
    },
  ],
})
export class DropZoneComponent
  extends BaseFormValueAccessorComponent
  implements OnChanges
{
  readonly #uploadFilesService = inject(UploadFilesService);

  public multiple: InputSignal<boolean> = input(true);

  public accept: InputSignal<string> = input("image/*,application/pdf");

  public sizeLimit: InputSignal<number> = input(2); //In MB

  public title: InputSignal<string> = input("");

  public description: InputSignal<string> = input("");

  public btnLabel: InputSignal<string> = input("Brows Files");

  public disabled: InputSignal<boolean> = input(false);
  public linkedDisabled = computed(() => this.disabled() || this.isDisabled());

  public dropzoneClass: InputSignal<string> = input("");

  public onFileDropped: OutputEmitterRef<File[]> = output();

  public selectedFiles: WritableSignal<FilesListItem[]> =
    this.#uploadFilesService.selectedFiles;

  public readonly SizeEnum = SizeEnum;

  public readonly classes: Signal<string[]> = linkedSignal(() => {
    const classes: string[] = [
      "rega-dropzone",
      this.linkedDisabled() ? "rega-dropzone--disabled" : "",
      this.dropzoneClass(),
    ];

    return classes.filter(Boolean);
  });

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
    this.onFileDropped.emit(result);
  });
}
