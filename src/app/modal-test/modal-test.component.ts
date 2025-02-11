import { Component, inject } from "@angular/core";
import { ModalComponent } from "projects/rega-ui-material/src/lib";
import { ModalService } from "projects/rega-ui-material/src/services";
import { MODAL_DATA } from "projects/rega-ui-material/src/utils";
import { DialogData } from "rega-material-ui";

@Component({
  selector: "app-modal-test",
  imports: [ModalComponent],
  templateUrl: "./modal-test.component.html",
  styleUrl: "./modal-test.component.scss",
})
export class ModalTestComponent {
  readonly #modalService = inject(ModalService);
  public readonly data: DialogData<{ title: any; message: any }> = inject(MODAL_DATA);

  public onCLose = (val?: boolean): void => this.#modalService.close(val || null);
}
