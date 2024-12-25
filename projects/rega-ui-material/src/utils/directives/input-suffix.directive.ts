import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
  selector: "[inputSuffix]",
  standalone: true,
})
export class InputSuffixDirective {
  public readonly ref: TemplateRef<unknown> = inject(TemplateRef);
}
