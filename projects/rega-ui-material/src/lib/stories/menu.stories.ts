import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { ButtonComponent, Menu, MenuComponent } from "../components";

const meta: Meta<Menu> = {
  title: "Components/Menu",
  decorators: [moduleMetadata({ imports: [MenuComponent, ButtonComponent] })],
  component: Menu,
  tags: ["autodocs"],
  render: (args) => ({
    args,
    template: `
          <rega-button [menuTriggerFor]="menu" label="Menu" variant="text" color="neutral" size="small" btnClass="!min-w-0"/>
          <rega-menu 
            #menu="regaMenu"
            [keepOpenOnItemsClicked]="${args.keepOpenOnItemsClicked}"
            menuClass="mt-1"
          >
            <rega-button label="Action 1" variant="text" color="neutral" size="medium" />
            <rega-button label="Action 2" variant="text" color="neutral" size="medium" />
            <rega-button label="Action 3" variant="text" color="neutral" size="medium" />
            <rega-button label="Action 4" variant="text" color="neutral" size="medium" />
          </rega-menu>
      `,
  }),
};

export default meta;

type Story = StoryObj<Menu>;

export const Default: Story = {
  argTypes: {
    keepOpenOnItemsClicked: {
      control: { type: "boolean" },
      description: "keep menu open if menu item(s) clicked",
    },
    menuClass: { control: { type: "text" } },
    onOpen: { description: "(event: Event) => void" },
    onClose: { description: "(event: Event) => void" },
  },
};

export const Grouped: Story = {
  argTypes: { ...Default.argTypes },
  args: { ...Default.args },
  render: (args) => ({
    args,
    template: `
          <rega-button [menuTriggerFor]="menu" label="Menu" variant="text" color="neutral" size="small" btnClass="!min-w-0"/>
          <rega-menu 
            #menu="regaMenu"
            [keepOpenOnItemsClicked]="${args.keepOpenOnItemsClicked}"
            menuClass="mt-1"
          >
            <div class="flex flex-col">
              <span class="w-40 py-1 px-4 text-sm font-ibm-medium text-neutralColor mb-2">Group 1</span>
              <rega-button label="Action 1" variant="text" color="neutral" size="medium" />
              <rega-button label="Action 2" variant="text" color="neutral" size="medium" />
              <rega-button label="Action 3" variant="text" color="neutral" size="medium" />
              <hr class="my-2 border-[1px] border-slate-200" />
              <span class="w-40 py-1 px-4 text-sm font-ibm-medium text-neutralColor">Group 2</span>
              <rega-button label="Action 1" variant="text" color="neutral" size="medium" />
              <rega-button label="Action 2" variant="text" color="neutral" size="medium" />
            </div>
          </rega-menu>
      `,
  }),
};

export const RTLGrouped: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  argTypes: { ...Default.argTypes },
  args: { ...Default.args },
  render: (args) => ({
    args,
    template: `
          <rega-button [menuTriggerFor]="menu" label="Menu" variant="text" color="neutral" size="small" btnClass="!min-w-0"/>
          <rega-menu 
            #menu="regaMenu"
            [keepOpenOnItemsClicked]="${args.keepOpenOnItemsClicked}"
            menuClass="mt-1"
          >
            <div class="flex flex-col">
              <span class="w-40 py-1 px-4 text-sm font-ibm-medium text-neutralColor mb-2">المجموعة 1</span>
              <rega-button label="Action 1" variant="text" color="neutral" size="medium" />
              <rega-button label="Action 2" variant="text" color="neutral" size="medium" />
              <rega-button label="Action 3" variant="text" color="neutral" size="medium" />
              <hr class="my-2 border-[1px] border-slate-200" />
              <span class="w-40 py-1 px-4 text-sm font-ibm-medium text-neutralColor">المجموعة 2</span>
              <rega-button label="Action 1" variant="text" color="neutral" size="medium" />
              <rega-button label="Action 2" variant="text" color="neutral" size="medium" />
            </div>
          </rega-menu>
      `,
  }),
};
