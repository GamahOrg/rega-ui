import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";

import { GStatic, SizeEnum, ColorEnum } from "../../utils";
import { RadioButtonComponent, RadioGroupComponent } from "../components";

const meta: Meta<RadioGroupComponent> = {
  title: "Components/Radio/RadioGroup",
  component: RadioGroupComponent,
  tags: ["autodocs"],
  decorators: [moduleMetadata({ imports: [RadioGroupComponent, RadioButtonComponent] })],
  render: (args) => {
    const { size, color, readOnly, disabled, ...props } = args;
    let prop: string = "";
    if (color) prop += `[color]="'${color}'" `;
    if (size) prop += `[size]="'${size}'" `;
    if (disabled) prop += `[disabled]="${disabled}" `;
    if (readOnly) prop += `[readOnly]="${readOnly}" `;
    return {
      props,
      template: `
        <rega-radio-group ${prop} class="flex justify-evenly items-center gap-10">
            <rega-radio-button value="1">Label 1 </rega-radio-button>
            <rega-radio-button value="2">Label 2 </rega-radio-button>
            <rega-radio-button value="3">Label 3 </rega-radio-button>
        </rega-radio-group>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
  argTypes: {
    disabled: { control: { type: "boolean" } },
    readOnly: { control: { type: "boolean" } },
    color: {
      options: GStatic.enumToArray(ColorEnum).map(({ value }) => value),
      control: { type: "select" },
      description: "ColorEnum",
    },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    valueChange: { description: "(event: any) => void" },
  },
  args: {
    color: ColorEnum.Primary,
    size: SizeEnum.Medium,
    readOnly: false,
    disabled: false,
  },
};

export const HorizontalWithInfoColorLarge: Story = {
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <rega-radio-group [color]="'info'" [size]="'large'" class="flex justify-evenly items-center gap-10">
            <rega-radio-button value="1">Label 1 </rega-radio-button>
            <rega-radio-button value="2">Label 2 </rega-radio-button>
            <rega-radio-button value="3">Label 3 </rega-radio-button>
        </rega-radio-group>
      `,
    };
  },
};

export const VerticalWithWarningColorSmall: Story = {
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <rega-radio-group [size]="'small'" [color]="'warning'" class="flex flex-col justify-evenly items-center gap-5">
            <rega-radio-button value="1">Label 1 </rega-radio-button>
            <rega-radio-button value="2">Label 2 </rega-radio-button>
            <rega-radio-button value="3">Label 3 </rega-radio-button>
        </rega-radio-group>
      `,
    };
  },
};

export const RTLWithSecondaryColorLarge: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <rega-radio-group [color]="'secondary'" [size]="'large'" class="flex justify-evenly items-center gap-10">
            <rega-radio-button value="1">العنوان 1 </rega-radio-button>
            <rega-radio-button value="2">العنوان 2 </rega-radio-button>
            <rega-radio-button value="3">العنوان 3 </rega-radio-button>
        </rega-radio-group>
      `,
    };
  },
};
