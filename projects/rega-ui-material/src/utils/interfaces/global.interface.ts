import { DirEnum, SizeEnum } from "../enums";

export type SizeType = `${SizeEnum}`;

export type Direction = `${DirEnum}`;

export interface IdName {
  id: any;
  name: any;
}

export interface keyValue {
  key: any;
  value: any;
}
