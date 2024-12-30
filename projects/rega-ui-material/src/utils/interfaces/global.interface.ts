import { ColorEnum, DirEnum, SizeEnum, VariantEnum } from "../enums";

export type VariantType = `${VariantEnum}`;

export type SizeType = `${SizeEnum}`;

export type ColorType = `${ColorEnum}`;

export type Direction = `${DirEnum}`;

export interface IdName {
  id: any;
  name: any;
}

export interface keyValue {
  key: any;
  value: any;
}
