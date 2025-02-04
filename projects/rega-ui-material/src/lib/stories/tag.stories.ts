import { Meta, StoryObj } from "@storybook/angular";
import { TagComponent } from "../components";
import { ColorEnum, GStatic, SizeEnum, TagVariantEnum } from "../../utils";

const meta: Meta<TagComponent> = {
  title: "Components/Tags/Tag",
  component: TagComponent,
  tags: ["autodocs"],
  render: (args) => {
    return {
      args,
      template: `
        <rega-tag [color]="'${args.color}'" [size]="'${args.size}'" [variant]="'${args.variant}'" [rounded]="${args.rounded}">Label</rega-tag>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<TagComponent>;

export const Default: Story = {
  argTypes: {
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
    variant: {
      options: GStatic.enumToArray(TagVariantEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "TagVariantEnum",
    },
    rounded: { control: { type: "boolean" } },
    tagClass: { control: { type: "text" } },
  },
  args: {
    color: ColorEnum.Neutral,
    size: SizeEnum.Large,
  },
};
