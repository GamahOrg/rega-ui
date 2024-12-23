import { type Meta, type StoryObj } from "@storybook/angular";
import { RegaButtonComponent } from "../components";
import { GStatic, SizeEnum, ButtonColorEnum, ButtonVariantEnum } from "../../utils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RegaButtonComponent> = {
  title: "Components/Button",
  component: RegaButtonComponent,
  tags: ["autodocs"],
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<RegaButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  argTypes: {
    disabled: { control: { type: "boolean" } },
    loading: { control: { type: "boolean" } },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
    },
    buttonType: {
      options: ["button", "reset", "submit"],
      control: { type: "select" },
    },
    color: {
      options: GStatic.enumToArray(ButtonColorEnum).map(({ value }) => value),
      control: { type: "select" },
    },
    variant: {
      options: GStatic.enumToArray(ButtonVariantEnum).map(({ value }) => value),
      control: { type: "radio" },
    },
    btnClass: { control: { type: "text" } },
  },
  args: {
    label: "Button",
    color: ButtonColorEnum.Primary,
    size: SizeEnum.Medium,
    variant: ButtonVariantEnum.Contained,
    disabled: false,
    loading: false,
    buttonType: "button",
    btnClass: "",
  },
};

export const SecondaryLarge: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Large,
    color: ButtonColorEnum.Secondary,
  },
};

export const SolidWarning: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Medium,
    color: ButtonColorEnum.Warning,
    variant: ButtonVariantEnum.Solid,
  },
};

export const ErrorOutline: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Medium,
    color: ButtonColorEnum.Error,
    variant: ButtonVariantEnum.Outlined,
  },
};

export const TextInfo: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Medium,
    color: ButtonColorEnum.Info,
    variant: ButtonVariantEnum.Text,
  },
};

export const Disabled: Story = {
  args: {
    label: "Button",
    size: SizeEnum.Medium,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: "Button",
    size: SizeEnum.Medium,
    loading: true,
  },
};
