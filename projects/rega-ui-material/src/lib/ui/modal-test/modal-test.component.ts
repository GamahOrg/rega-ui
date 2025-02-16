import { Component, inject } from "@angular/core";
import { ModalComponent } from "../../components";
import { ModalService } from "../../../services";
import { MODAL_DATA, DialogData } from "../../../utils";

@Component({
  selector: "app-modal-test",
  imports: [ModalComponent],
  templateUrl: "./modal-test.component.html",
  styleUrl: "./modal-test.component.scss",
})
export class ModalTestComponent {
  // readonly #modalService = inject(ModalService);
  // public readonly data: DialogData<{ title: any; message: any }> = inject(MODAL_DATA);

  public onClose = (val?: boolean): void => {
    // this.#modalService.close(val || null);
  };
}
