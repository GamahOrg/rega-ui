import { LazyLoadMeta } from "primeng/api";

export interface TableLazyLoadEvent extends LazyLoadMeta {
  first?: number;
  last?: number;
}
