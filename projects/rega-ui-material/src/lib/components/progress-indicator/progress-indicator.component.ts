import {
  Component,
  computed,
  input,
  InputSignal,
  linkedSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from "@angular/core";
import {
  AlignmentEnum,
  AlignmentType,
  IndicatorStatusEnum,
  IndicatorStatusStep,
  IndicatorStep,
} from "../../../utils";
import { NgClass } from "@angular/common";

@Component({
  selector: "rega-progress-indicator",
  imports: [NgClass],
  templateUrl: "./progress-indicator.component.html",
})
export class ProgressIndicatorComponent {
  public readonly steps: InputSignal<IndicatorStep[]> = input.required();
  public readonly linkedSteps: WritableSignal<IndicatorStatusStep[]> = linkedSignal(() =>
    this.steps().length
      ? this.steps().map((step, i) => ({ ...step, status: this._calculateStatus(i) }))
      : []
  );

  public readonly activeStepIndex: ModelSignal<number> = model(0);

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

  public readonly IndicatorStatusEnum = IndicatorStatusEnum;

  public stepClick = (index: number): void => {
    this.activeStepIndex.set(index);
    this.onStepClick.emit(index);
  };

  private _calculateStatus = (stepIndex: number): IndicatorStatusEnum => {
    stepIndex += 1;

    if (stepIndex === this.activeStepIndex()) return IndicatorStatusEnum.Active;
    else {
      if (this.activeStepIndex() > stepIndex) return IndicatorStatusEnum.Completed;
      return IndicatorStatusEnum.UpComing;
    }
  };
}
