import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
  selector: "[inputPrefix]",
  standalone: true,
})
export class InputPrefixDirective {
  public readonly ref: TemplateRef<unknown> = inject(TemplateRef);
}
