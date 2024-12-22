import { Component, inject, OnInit } from "@angular/core";
import {
  BreadcrumbItem,
  BreadcrumbService,
  RegaBreadcrumbComponent,
} from "rega-material-ui";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RegaBreadcrumbComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "rega-ui";

  readonly #breadcrumbService = inject(BreadcrumbService);

  public items: BreadcrumbItem[] = [
    { label: "Link 1", link: "/link1" },
    { label: "Link 2", link: "/link2" },
    { label: "Link 3", link: "/link3", disabled: true },
    { label: "Link 4", link: "/link4" },
    { label: "Link 5", link: "/link5" },
  ];

  public ngOnInit(): void {
    this.#breadcrumbService.breadcrumb.set({
      items: this.items,
    });
  }
}
