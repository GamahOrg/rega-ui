import { AlignmentEnum } from "../enums";

export interface ProcessStep {
  title?: string;
  description?: string;
}

export type AlignmentType = `${AlignmentEnum}`;
