import { SizeType } from "./global.interface";

export interface BreadcrumbItem {
  label: string;
  link?: string;
  disabled?: boolean;
}

export interface Breadcrumb {
  items: BreadcrumbItem[];
  size?: SizeType;
  btnClass?: string;
  breadcrumbClass?: string;
}
