import { BrowserModule } from "@angular/platform-browser";
import {
  Injector,
  ErrorHandler,
  runInInjectionContext,
  inject,
  ApplicationRef,
} from "@angular/core";
import { applicationConfig, Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ButtonComponent, ModalComponent } from "../components";
import { ModalService } from "../../services";
import { ALIGN, MODAL_DATA, ModalAlignEnum, STYLE_CLASSES } from "../../utils";
import { injectInjectorToProps } from "../../utils/helper/inject-injector-to-props.decorator";
import { ModalTestComponent } from "../ui";

const meta: Meta<ModalComponent> = {
  title: "Components/Modal",
  component: ModalComponent,
  decorators: [
    moduleMetadata({ imports: [BrowserModule, ModalComponent, ButtonComponent] }),
    applicationConfig({
      providers: [
        ModalService,
        { provide: MODAL_DATA, useValue: {} },
        { provide: ALIGN, useValue: ModalAlignEnum.Center },
        { provide: STYLE_CLASSES, useValue: [""] },
        { provide: ErrorHandler, useClass: ErrorHandler },
      ],
    }),
  ],
  tags: ["autodocs"],
  render: () => {
    // let modalService: ModalService;
    // const injector = inject(Injector);

    // runInInjectionContext(injector, () => {
    //   modalService = inject(ModalService);
    // });

    return {
      applicationConfig: {
        providers: [
          ModalService,
          { provide: MODAL_DATA, useValue: {} },
          { provide: ALIGN, useValue: ModalAlignEnum.Center },
          { provide: STYLE_CLASSES, useValue: [""] },
          { provide: ErrorHandler, useClass: ErrorHandler },
        ],
      },
      template: `
       <rega-button
        label="Open Modal"
        color="primary"
        size="large"
        btnClass="min-w-0 text-base"
        (click)="openModal()"
        />
      `,
      props: {
        openModal: () => {},
      },
    };
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {};

//     const openModal = (): void => {};
//     // console.log("🚀 ~ openModal ~ injector:");
//     //   // modalService
//     //   //   .open(ModalTestComponent, {
//     //   //     data: { title: "Modal Title", message: "Modal Content" },
//     //   //     backdropClose: true,
//     //   //     align: ModalAlignEnum.Center,
//     //   //     width: "400px",
//     //   //     height: "150px",
//     //   //   })
//     //   //   .afterClosed()
//     //   //   .subscribe();
