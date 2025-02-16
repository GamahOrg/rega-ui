import { InjectionToken } from "@angular/core";
import { ModalAlignEnum } from "../enums";

export type ModalAlignType = `${ModalAlignEnum}`;

export interface ModalOptions {
  data?: any;
  width?: string;
  height?: string;
  align?: string;
  backdropClose?: boolean;
  styleClasses?: string[];
  position?: ModalPosition;
}

export interface DialogData<T = any> {
  data?: T;
}

export declare interface ModalPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export const MODAL_DATA = new InjectionToken<DialogData<any>>("MODAL_DATA");
export const ALIGN = new InjectionToken<ModalAlignType>("ALIGN");
export const STYLE_CLASSES = new InjectionToken<string[]>("STYLE_CLASSES");
