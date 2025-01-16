import { Meta, StoryObj } from "@storybook/angular";
import { AutocompleteComponent } from "../components";
import { GStatic, Option, SizeEnum, VariantEnum } from "../../utils";
import { signal, WritableSignal } from "@angular/core";

const meta: Meta = {
  title: "Components/Select/Autocomplete",
  component: AutocompleteComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<AutocompleteComponent>;

const options: WritableSignal<Option[]> = signal([]);
for (let i = 0; i < 4; i++) {
  options().push({ label: "Item label " + i, id: i });
}

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
      description: "Option[]",
      control: { type: "object" },
    },
    multiple: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
    autocompleteClass: { control: { type: "text" } },
    emptyMessage: {
      control: { type: "text" },
      description: "Empty result search message",
    },
    lazy: {
      control: { type: "boolean" },
      description: "If want to filter Or load data on demand from server not from client",
    },
    onSearch: { description: "(event: string) => void" },
    onLazyLoad: { description: "(event: LazyLoadingEvent) => void" },
  },
  args: {
    size: SizeEnum.Medium,
    label: "Label",
    variant: VariantEnum.Default,
    options: options(),
  },
};

export const MultipleValuesLarge: Story = {
  args: {
    ...Default.args,
    multiple: true,
    size: SizeEnum.Large,
  },
};

export const SingleValues: Story = {
  args: {
    ...Default.args,
    multiple: false,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    size: SizeEnum.Large,
    error: true,
  },
};

export const RTLSingle: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    size: SizeEnum.Large,
    label: "العنوان",
    placeholder: "نص توضيحي",
    emptyMessage: "لا توجد بيانات",
  },
};

export const RTLMultiple: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    multiple: true,
    size: SizeEnum.Large,
    label: "العنوان",
    placeholder: "نص توضيحي",
    emptyMessage: "لا توجد بيانات",
  },
};
