import { Meta, StoryObj } from "@storybook/angular";
import { RegaBreadcrumbComponent } from "../components";
import { DirEnum, GStatic, SizeEnum } from "@rega-material/utils";

const meta: Meta<RegaBreadcrumbComponent> = {
  title: "Breadcrumb",
  component: RegaBreadcrumbComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<RegaBreadcrumbComponent>;

export const Default: Story = {
  argTypes: {
    items: {},
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
    },
    dir: {
      options: GStatic.enumToArray(DirEnum).map(({ value }) => value),
      control: { type: "radio" },
    },
    btnClass: { control: { type: "text" } },
    breadcrumbClass: { control: { type: "text" } },
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
  args: {
    ...Default.args,
    dir: DirEnum.RTL,
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
