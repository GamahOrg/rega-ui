import { Meta, StoryObj } from "@storybook/angular";
import { TextInputComponent } from "../components/text-input/text-input.component";
import { GStatic, TextareaVariantEnum } from "../../utils";
import { TextAreaComponent } from "../components/textarea/textarea.component";

const meta: Meta<TextInputComponent> = {
  title: "Components/Text Area",
  component: TextAreaComponent,
  tags: ["autodocs"],
  args: {},
  decorators: [],
};

export default meta;
type Story = StoryObj<TextAreaComponent>;

export const Default: Story = {
  argTypes: {
    label: { control: { type: "text" } },
    variant: {
      options: GStatic.enumToArray(TextareaVariantEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "TextareaVariantEnum",
    },
    error: { control: { type: "boolean" }, description: "Boolean" },
    readOnly: { control: { type: "boolean" }, description: "Boolean" },
    disabled: { control: { type: "boolean" }, description: "Boolean" },
    placeholder: { control: { type: "text" }, description: "String" },
    textareaClass: { control: { type: "text" }, description: "String" },
  },
  args: {
    label: "Label",
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
