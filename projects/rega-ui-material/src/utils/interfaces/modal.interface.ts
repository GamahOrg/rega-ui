import { InjectionToken } from "@angular/core";

export interface ModalOptions {
  data?: any;
  width?: string;
  height?: string;
  backdropClose?: boolean;
}

export interface DialogData<T = any> {
  data?: T;
}

export const MODAL_DATA = new InjectionToken<DialogData<any>>("MODAL_DATA");
