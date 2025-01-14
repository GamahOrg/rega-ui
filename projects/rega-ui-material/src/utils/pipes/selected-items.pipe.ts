import { Pipe, PipeTransform } from "@angular/core";
import { GStatic } from "../helper";
import { Option } from "../interfaces";

@Pipe({ name: "isOptionSelected" })
export class SelectedItemsPipe implements PipeTransform {
  public transform(list: Option[] | Option, option: Option, multiple = false): boolean {
    if (!list || !option) return false;

    return multiple
      ? Array.isArray(list) && list.some((item) => GStatic.isEqual(item, option))
      : GStatic.isEqual(list as Option, option);
  }
}
