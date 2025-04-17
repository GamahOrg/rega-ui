import { NgModule } from "@angular/core";
import { Toaster } from "./toaster.component";
import { ToasterService } from "./toaster.service";

const Modules: Array<any> | any = [Toaster];

@NgModule({
  imports: [Modules],
  exports: [Modules],
  providers: [ToasterService],
})
export class ToasterComponent {}
