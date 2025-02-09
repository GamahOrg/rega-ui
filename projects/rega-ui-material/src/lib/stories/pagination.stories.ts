import { Meta, StoryObj } from "@storybook/angular";
import { PaginationComponent } from "../components";
import { GStatic, Option, SizeEnum, VariantEnum } from "../../utils";

const meta: Meta = {
  title: "Components/Pagination",
  component: PaginationComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  argTypes: {
    count: {
      name: "count",
      type: { name: "number", required: true },
      default: 100,
      description: "Total length",
    },
    currentPage: {
      type: { name: "number", required: true },
      description: "Selected page index",
      default: 1,
    },
    siblingCount: { type: "number", default: 1 },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    onPageChange: { description: "(event: number) => void" },
  },
  args: {
    count: 100,
    currentPage: 1,
    siblingCount: 1,
    size: SizeEnum.Medium,
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: { ...Default.args },
};
