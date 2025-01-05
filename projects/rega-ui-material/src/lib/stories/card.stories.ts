import { Meta, StoryObj } from "@storybook/angular";
import { GStatic } from "../../utils";
import { CardComponent } from "../components";
import { CardTypeEnum, ColorEnum, EffectTypeEnum } from "dist/rega-ui-material";

const meta: Meta<CardComponent> = {
  title: "Components/Card",
  component: CardComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  argTypes: {
    title: { control: { type: "text" }, description: "String" },
    description: { control: { type: "text" }, description: "String" },
    icon: { control: { type: "text" }, description: "Material icons" },
    cardClass: { control: { type: "text" }, description: "Class String" },
    type: {
      options: GStatic.enumToArray(CardTypeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "CardTypeEnum",
    },
    effect: {
      options: GStatic.enumToArray(EffectTypeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "EffectTypeEnum",
    },
    color: {
      options: GStatic.enumToArray(ColorEnum).map(({ value }) => value),
      control: { type: "select" },
      description: "ColorEnum",
    },
    defaultExpanded: { control: { type: "boolean" }, description: "Boolean" },
    disabled: { control: { type: "boolean" }, description: "Boolean" },
  },
  args: {
    type: CardTypeEnum.Default,
    effect: EffectTypeEnum.Shadow,
    color: ColorEnum.Primary,
    defaultExpanded: false,
    disabled: false,
    selected: false,
    title: "Card Title",
    description: "Card content placeholder text goes here",
    icon: "check_circle_outline",
    expandableContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};

export const SelectionGroup: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
      <div class="flex flex-col justify-evenly items-center gap-4">
        <rega-card 
          [type]="'selectable'"
          title="Card Title 1"
          description="Card content 1"
        />
        
        <rega-card 
          [type]="'selectable'"
          [color]="'warning'"
          title="Card Title 2"
          description="Card content 2"
        />
      </div>
      `,
    };
  },
};

export const RTLExpandable: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  argTypes: { ...Default.argTypes },
  args: {
    ...Default.args,
    title: "عنوان البطاقة",
    description: "نص إضافي لمحتوى البطاقة",
    type: CardTypeEnum.Expandable,
  },
};

export const RTLSelectable: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  argTypes: { ...Default.argTypes },
  args: {
    ...Default.args,
    title: "عنوان البطاقة",
    description: "نص إضافي لمحتوى البطاقة",
    type: CardTypeEnum.Selectable,
  },
};
