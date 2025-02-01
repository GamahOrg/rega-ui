import { AlignmentEnum, IndicatorStatusEnum } from "../enums";

export interface IndicatorStep {
  title?: string;
  description?: string;
}

export interface IndicatorStatusStep extends IndicatorStep {
  status: IndicatorStatusEnum;
}

export type AlignmentType = `${AlignmentEnum}`;
