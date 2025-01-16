import { Pipe, PipeTransform } from "@angular/core";
import { Option } from "../interfaces";

@Pipe({ name: "selectedOption" })
export class SelectedOptionPipe implements PipeTransform {
  public transform(options: Option[], optId: string): Option {
    return options.find((op: Option) => op.id === optId) as Option;
  }
}
