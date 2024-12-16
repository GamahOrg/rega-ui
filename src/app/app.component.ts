import { Component } from "@angular/core";
import { RegaButtonComponent } from "@rega-material";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RegaButtonComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "rega-ui";
}
