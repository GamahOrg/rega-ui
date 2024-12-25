import { Meta, StoryObj } from "@storybook/angular";
import { TextInputComponent } from "../components/text-input/text-input.component";
import { GStatic, InputVariantEnum, SizeEnum } from "../../utils";

const meta: Meta<TextInputComponent> = {
  title: "Components/Text Input",
  component: TextInputComponent,
  tags: ["autodocs"],
  args: {},
  decorators: [],
};

export default meta;
type Story = StoryObj<TextInputComponent>;

export const Default: Story = {
  argTypes: {
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
    },
    label: { control: { type: "text" } },
    variant: {
      options: GStatic.enumToArray(InputVariantEnum).map(({ value }) => value),
      control: { type: "radio" },
    },
    error: { control: { type: "boolean" }, description: "Boolean" },
    readOnly: { control: { type: "boolean" }, description: "Boolean" },
    disabled: { control: { type: "boolean" }, description: "Boolean" },
    prefix: { control: { type: "text" }, description: "Boolean" },
    inputPrefix: {
      control: { type: "object" },
      description:
        "Make sure you importing <InputPrefixDirective> ... Then inside component tag <ng-template inputPrefix>prefix<ng-template/>",
    },
    suffix: { control: { type: "text" }, description: "String" },
    inputSuffix: {
      control: { type: "object" },
      description:
        "Make sure you importing <InputSuffixDirective> ... Then inside component tag <ng-template suffixPrefix>suffix<ng-template/>",
    },
    inputClass: { control: { type: "text" }, description: "String" },
    prefixClass: { control: { type: "text" }, description: "String" },
    suffixClass: { control: { type: "text" }, description: "String" },
    placeholder: { control: { type: "text" }, description: "String" },
  },
  args: {
    label: "Label",
  },
};

export const Prefix: Story = {
  args: {
    ...Default.args,
    prefix: "$",
    placeholder: "Enter price",
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    label: "العنوان",
    placeholder: "نص توضيحي",
  },
};
