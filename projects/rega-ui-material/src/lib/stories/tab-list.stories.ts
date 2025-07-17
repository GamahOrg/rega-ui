import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { TabListComponent, TabsComponent } from "../components";
import { GStatic, SizeEnum } from "../../utils";

const meta: Meta<TabListComponent> = {
  title: "Components/Tabs/TabList",
  decorators: [moduleMetadata({ imports: [TabsComponent] })],
  component: TabListComponent,
  tags: ["autodocs"],
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab-list 
          [selectedIndex]="'${args.selectedIndex}'" 
          [size]="'${args.size}'" 
          [vertical]="${args.vertical}" 
          [flush]="${args.flush}" 
        >
           <rega-tab><span class="material-icons">home</span><span>Tab 1</span></rega-tab>
           <rega-tab><span class="material-icons">settings</span><span>Tab 2</span></rega-tab>
           <rega-tab><span class="material-icons">shopping_cart</span><span>Tab 3</span></rega-tab>
        </rega-tab-list>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<TabListComponent>;

export const Default: Story = {
  argTypes: {
    selectedIndex: { control: { type: "number" } },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    vertical: { control: { type: "boolean" } },
    flush: { control: { type: "boolean" } },
    tabListClass: { control: { type: "text" } },
  },
  args: {
    size: SizeEnum.Large,
    selectedIndex: 0,
  },
};

export const Disabled: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab-list 
          [selectedIndex]="'${args.selectedIndex}'" 
          [size]="'${args.size}'" 
          [vertical]="${args.vertical}" 
          [flush]="${args.flush}" 
        >
           <rega-tab><span class="material-icons">home</span><span>Tab 1</span></rega-tab>
           <rega-tab [disabled]="true"><span class="material-icons">settings</span><span>Tab 2</span></rega-tab>
           <rega-tab><span class="material-icons">shopping_cart</span><span>Tab 3</span></rega-tab>
        </rega-tab-list>
      `,
    };
  },
};

export const VerticalFlush: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, flush: true, vertical: true },
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab-list 
          [selectedIndex]="'${args.selectedIndex}'" 
          [size]="'${args.size}'" 
          [vertical]="${args.vertical}" 
          [flush]="${args.flush}" 
        >
           <rega-tab><span class="material-icons">home</span><span>Tab 1</span></rega-tab>
           <rega-tab><span class="material-icons">settings</span><span>Tab 2</span></rega-tab>
           <rega-tab><span class="material-icons">shopping_cart</span><span>Tab 3</span></rega-tab>
        </rega-tab-list>
      `,
    };
  },
};

export const RTLFlush: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  argTypes: { ...Default.argTypes },
  args: { ...Default.args, flush: true },
  render: (args) => {
    return {
      args,
      template: `
        <rega-tab-list 
          [selectedIndex]="'${args.selectedIndex}'" 
          [size]="'${args.size}'" 
          [vertical]="${args.vertical}" 
          [flush]="${args.flush}" 
        >
           <rega-tab><span class="material-icons">home</span><span>تاب 1</span></rega-tab>
           <rega-tab><span class="material-icons">settings</span><span>تاب 2</span></rega-tab>
           <rega-tab><span class="material-icons">shopping_cart</span><span>تاب 3</span></rega-tab>
        </rega-tab-list>
      `,
    };
  },
};
