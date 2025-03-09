import { NgModule } from "@angular/core";
import { Menu } from "./menu.component";
import { MenuDirective } from "../../../utils";

const Modules: Array<any> | any = [Menu, MenuDirective];

@NgModule({
  imports: [Modules],
  exports: [Modules],
})
export class MenuComponent {}
