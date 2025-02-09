import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { TabComponent, TabListComponent } from "../components";
import { GStatic, SizeEnum } from "../../utils";

const meta: Meta<TabComponent> = {
  title: "Components/Tabs/Tab",
  component: TabComponent,
  decorators: [
    moduleMetadata({
      imports: [TabListComponent, TabComponent],
      providers: [TabListComponent],
    }),
  ],
  tags: ["autodocs"],
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab 
          [size]="'${args.size}'" 
          [vertical]="${args.vertical}" 
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
    vertical: { control: { type: "boolean" } },
    tabClass: { control: { type: "text" }, description: "String" },
  },
  args: {
    size: SizeEnum.Large,
  },
};

export const Vertical: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, vertical: true },
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab 
          [size]="'${args.size}'" 
          [vertical]="${args.vertical}" 
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
          [vertical]="${args.vertical}" 
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
