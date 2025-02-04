import { type Meta, type StoryObj } from "@storybook/angular";
import { RegaButtonComponent } from "../components";
import { GStatic, SizeEnum, ButtonVariantEnum, ColorEnum } from "../../utils";

const meta: Meta<RegaButtonComponent> = {
  title: "Components/Button",
  component: RegaButtonComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<RegaButtonComponent>;

export const Primary: Story = {
  argTypes: {
    disabled: { control: { type: "boolean" } },
    loading: { control: { type: "boolean" } },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    buttonType: {
      options: ["button", "reset", "submit"],
      control: { type: "select" },
      description: " ['button', 'reset', 'submit']",
    },
    color: {
      options: GStatic.enumToArray(ColorEnum).map(({ value }) => value),
      control: { type: "select" },
      description: "ColorEnum",
    },
    variant: {
      options: GStatic.enumToArray(ButtonVariantEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "ButtonVariantEnum",
    },
    btnClass: { control: { type: "text" } },
  },
  args: {
    label: "Button",
    color: ColorEnum.Primary,
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
    color: ColorEnum.Secondary,
  },
};

export const SolidWarning: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Medium,
    color: ColorEnum.Warning,
    variant: ButtonVariantEnum.Solid,
  },
};

export const ErrorOutline: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Medium,
    color: ColorEnum.Error,
    variant: ButtonVariantEnum.Outlined,
  },
};

export const TextInfo: Story = {
  args: {
    ...Primary.args,
    size: SizeEnum.Medium,
    color: ColorEnum.Info,
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
