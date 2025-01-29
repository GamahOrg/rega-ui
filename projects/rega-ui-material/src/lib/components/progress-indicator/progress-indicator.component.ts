import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from "@angular/core";
import { AlignmentEnum, AlignmentType, ProcessStep } from "../../../utils";
import { CommonModule } from "@angular/common";

@Component({
  selector: "rega-progress-indicator",
  imports: [CommonModule],
  templateUrl: "./progress-indicator.component.html",
})
export class ProgressIndicatorComponent {
  public readonly steps: InputSignal<ProcessStep> = input.required();

  public readonly activeStepIndex: InputSignal<number> = input.required();

  public readonly alignment: InputSignal<AlignmentType> = input(
    AlignmentEnum.Horizontal as AlignmentType
  );

  public readonly indicatorClass: InputSignal<string> = input("");

  public readonly onStepClick: OutputEmitterRef<number> = output();

  public readonly classes: Signal<string[]> = computed(() => {
    const classes: string[] = [
      "rega-indicator",
      `rega-indicator--${this.alignment()}`,
      this.indicatorClass(),
    ];

    return classes.filter(Boolean);
  });
}
