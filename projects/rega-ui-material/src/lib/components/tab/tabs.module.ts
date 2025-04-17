import { NgModule } from "@angular/core";
import { TabComponent } from "./tab.component";
import { TabListComponent } from "./tab-list.component";

const Modules: Array<any> | any = [TabComponent, TabListComponent];

@NgModule({
  imports: [Modules],
  exports: [Modules],
  providers: [TabListComponent],
})
export class TabsComponent {}
