import { Meta, StoryObj } from "@storybook/angular";
import { BreadcrumbItem, GStatic, SizeEnum } from "../../utils";
import { RegaBreadcrumbComponent } from "../components";

const meta: Meta<RegaBreadcrumbComponent> = {
  title: "Components/Breadcrumb",
  component: RegaBreadcrumbComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<RegaBreadcrumbComponent>;

export const Default: Story = {
  argTypes: {
    items: {
      name: "items",
      type: { name: "string", required: true },
      defaultValue: [] as BreadcrumbItem[],
      description: "BreadcrumbItem[]",
      control: { type: "object" },
    },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    btnClass: { control: { type: "text" }, description: "String" },
    breadcrumbClass: { control: { type: "text" }, description: "String" },
    breadcrumbBtn: {
      control: { type: "object" },
      description: "ContentChild with Template variable #breadcrumbBtn",
    },
    divider: {
      control: { type: "object" },
      description: "ContentChild with Template variable #divider",
    },
  },
  args: {
    items: [
      { label: "Link 1", link: "/link1" },
      { label: "Link 2", link: "/link2" },
      { label: "Link 3", link: "/link3" },
      { label: "Link 4", link: "/link4" },
      { label: "Link 5", link: "/link5" },
    ],
  },
};

export const DisabledItems: Story = {
  args: {
    ...Default.args,
    items: [
      { label: "Link 1", link: "/link1" },
      { label: "Link 2", link: "/link2" },
      { label: "Link 3", link: "/link3", disabled: true },
      { label: "Link 4", link: "/link4" },
      { label: "Link 5", link: "/link5" },
    ],
  },
};

export const ExtraItems: Story = {
  args: {
    ...Default.args,
    items: [
      { label: "Link 1", link: "/link1" },
      { label: "Link 2", link: "/link2" },
      { label: "Link 3", link: "/link3" },
      { label: "Link 4", link: "/link4" },
      { label: "Link 5", link: "/link5" },
      { label: "Link 6", link: "/link6" },
    ],
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl" },
  args: {
    ...Default.args,
    items: [
      { label: "رابط 1", link: "/link1" },
      { label: "رابط 2", link: "/link2" },
      { label: "رابط 3", link: "/link3" },
      { label: "رابط 4", link: "/link4" },
      { label: "رابط 5", link: "/link5" },
      { label: "رابط 6", link: "/link6" },
    ],
  },
};
