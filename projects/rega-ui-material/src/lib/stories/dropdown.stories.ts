import { Meta, StoryObj } from "@storybook/angular";
import { DropdownComponent } from "../components";
import { GStatic, SizeEnum, VariantEnum, Option } from "../../utils";
import { signal, WritableSignal } from "@angular/core";

const meta: Meta = {
  title: "Components/Select/Dropdown",
  component: DropdownComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DropdownComponent>;

const options: WritableSignal<Option[]> = signal(
  Array.from({ length: 4 }, (_, id) => ({ id, label: "Item label " + id }))
);

export const Default: Story = {
  argTypes: {
    size: {
      options: GStatic.enumToArray(SizeEnum)
        .filter(({ value }) => value !== SizeEnum.Small)
        .map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    label: { control: { type: "text" } },
    variant: {
      options: GStatic.enumToArray(VariantEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "VariantEnum",
    },
    error: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    options: {
      name: "options",
      type: { name: "string", required: true },
      defaultValue: [] as Option[],
      description: "Option[] | string[]",
      control: { type: "object" },
    },
    optionValue: { control: { type: "text" }, description: "By default id" },
    showClear: { control: { type: "boolean" }, description: "Clear option action" },
    filter: {
      control: { type: "boolean" },
      description: "Show filter box inside option list",
    },
    placeholder: { control: { type: "text" } },
    dropdownClass: { control: { type: "text" } },
    emptyMessage: {
      control: { type: "text" },
      description: "Empty result search message",
    },
    lazy: {
      control: { type: "boolean" },
      description: "If want to filter Or load data on demand from server not from client",
    },
    dropdownOption: {
      control: { type: "object" },
      description:
        "ContentChild with Template variable #dropdownOption, extract variables default option and isSelected",
    },
    dropdownHeader: {
      control: { type: "object" },
      description: "ContentChild with Template variable #dropdownHeader",
    },
    dropdownFooter: {
      control: { type: "object" },
      description: "ContentChild with Template variable #dropdownFooter",
    },
    dropdownChange: { description: "(event: unknown) => void" },
    onSearch: { description: "(event: string) => void" },
    onLazyLoad: { description: "(event: LazyLoadingEvent) => void" },
  },
  args: {
    size: SizeEnum.Large,
    label: "Label",
    variant: VariantEnum.Default,
    options: options(),
  },
};

export const WithClear: Story = {
  args: {
    ...Default.args,
    showClear: true,
  },
};

export const ClearWithFilter: Story = {
  args: {
    ...Default.args,
    showClear: true,
    filter: true,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

export const MediumWithFooter: Story = {
  args: {
    ...Default.args,
    size: SizeEnum.Medium,
  },
  render: (args) => {
    return {
      args,
      template: `
        <rega-dropdown size='medium'>
            <ng-template #dropdownFooter>
              <div class="w-full flex justify-center items-center p-1 px-4">
                  <button class="w-full flex justify-center items-center rounded bg-slate-50 hover:bg-slate-100 text-gray-800 text-sm font-medium py-1 px-2">
                      Add Option +
                  </button>
              </div>
            </ng-template>
        </rega-dropdown>
      `,
    };
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    size: SizeEnum.Large,
    label: "العنوان",
    placeholder: "نص توضيحي",
    emptyMessage: "لا توجد بيانات",
  },
};
