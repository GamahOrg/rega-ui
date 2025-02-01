import { Meta, StoryObj } from "@storybook/angular";
import { GStatic, IndicatorStep, AlignmentEnum } from "../../utils";
import { ProgressIndicatorComponent } from "../components";
import { signal, Signal } from "@angular/core";

const meta: Meta<ProgressIndicatorComponent> = {
  title: "Components/ProcessIndicator",
  component: ProgressIndicatorComponent,
  tags: ["autodocs"],
  render: (args) => {
    return {
      args,
      template: `
        <section class="w-[800px] flex justify-center items-center">
          <rega-progress-indicator class="w-full" 
           [steps]="[
           {title:'Step 1', description:'description 1'}, 
           {title:'Step 2', description:'description 2'}, 
           {title:'Step 3', description:'description 3'}, 
           {title:'Step 4', description:'description 4'}]"
           [activeStepIndex] = "${args.activeStepIndex}"
           [alignment] = "'${args.alignment}'"
          />
        </section>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<ProgressIndicatorComponent>;

const steps: Signal<IndicatorStep[]> = signal(
  Array.from({ length: 4 }, (_, i) => ({
    title: `Strep ${i}`,
    description: `Description ${i}`,
  }))
);

export const Default: Story = {
  argTypes: {
    steps: {
      name: "steps",
      type: { name: "string", required: true },
      defaultValue: [] as IndicatorStep[],
      description: "IndicatorStep[]",
      control: { type: "object" },
    },
    alignment: {
      options: GStatic.enumToArray(AlignmentEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "AlignmentEnum",
    },
    indicatorClass: { control: { type: "text" }, description: "String" },
    activeStepIndex: {
      name: "activeStepIndex",
      type: { name: "string", required: true },
      defaultValue: 1,
      description: "number",
      control: { type: "object" },
    },
    stepAction: {
      control: { type: "object" },
      description: "ContentChild with Template variable #stepAction",
    },
    stepContent: {
      control: { type: "object" },
      description: "ContentChild with Template variable #stepContent",
    },
    onStepClick: { description: "(stepIndex: number) => void" },
  },
  args: {
    steps: steps(),
    activeStepIndex: 0,
    alignment: AlignmentEnum.Horizontal,
  },
};

export const StepAction: Story = {
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <section class="w-[800px] flex justify-center items-center">
          <rega-progress-indicator class="w-full" 
            [steps]="[
            {title:'Step 1', description:'description 1'}, 
            {title:'Step 2', description:'description 2'}, 
            {title:'Step 3', description:'description 3'}, 
            {title:'Step 4', description:'description 4'}]"
            [activeStepIndex] = "${args.activeStepIndex}"
            [alignment] = "'${args.alignment}'"
          >
            <ng-template #stepAction let-step let-index="index" let-status="status">
              <div
                class = "h-10 w-10 relative flex justify-center items-center text-white bg-slate-300 !z-[1]">
                 {{ index }}
              </div>
            </ng-template>
          </rega-progress-indicator>
        </section>
      `,
    };
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <section class="w-[800px] flex justify-center items-center">
          <rega-progress-indicator class="w-full" 
          [steps]="[
          {title:'خطوة 1', description:'وصف 1'}, 
          {title:'خطوة 2', description:'وصف 2'}, 
          {title:'خطوة 3', description:'وصف 3'}, 
          {title:'خطوة 4', description:'وصف 4'}]"
           [activeStepIndex] = "${args.activeStepIndex}"
           [alignment] = "'${args.alignment}'"
          />
        </section>
      `,
    };
  },
};

export const RTLVertical: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: { ...Default.args, alignment: AlignmentEnum.Vertical, activeStepIndex: 2 },
  render: (args) => {
    return {
      args,
      template: `
        <section class="w-[800px] flex justify-center items-center">
          <rega-progress-indicator class="w-full" 
          [steps]="[
          {title:'خطوة 1', description:'وصف 1'}, 
          {title:'خطوة 2', description:'وصف 2'}, 
          {title:'خطوة 3', description:'وصف 3'}, 
          {title:'خطوة 4', description:'وصف 4'}]"
           [activeStepIndex] = "${args.activeStepIndex}"
           [alignment] = "'${args.alignment}'"
          />
        </section>
      `,
    };
  },
};
