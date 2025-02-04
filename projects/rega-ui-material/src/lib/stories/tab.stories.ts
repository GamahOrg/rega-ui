import { Meta, StoryObj } from "@storybook/angular";
import { signal, WritableSignal } from "@angular/core";
import { TabComponent } from "../components";
import { GStatic, Option, SizeEnum, VariantEnum } from "../../utils";

const meta: Meta<TabComponent> = {
  title: "Components/Tab",
  component: TabComponent,
  tags: ["autodocs"],
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab 
          [size]="'${args.size}'" 
          [selected]="${args.selected}" 
          [disabled]="${args.disabled}" 
        >
            <span class="material-icons">home</span>
            <span>Text</span>
        </rega-tab>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<TabComponent>;

export const Default: Story = {
  argTypes: {
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    selected: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    tabClass: { control: { type: "text" }, description: "String" },
  },
  args: {
    size: SizeEnum.Large,
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  argTypes: { ...Default.argTypes },
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab 
          [size]="'${args.size}'" 
          [selected]="${args.selected}" 
          [disabled]="${args.disabled}" 
        >
            <span class="material-icons">home</span>
            <span>Text</span>
        </rega-tab>
      `,
    };
  },
};
