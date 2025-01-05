import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { GStatic, SizeEnum, ColorEnum } from "../../utils";
import { RadioButtonComponent, RadioGroupComponent } from "../components";

const meta: Meta<RadioButtonComponent> = {
  title: "Components/Radio/Radio",
  component: RadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [RadioGroupComponent, RadioButtonComponent],
      providers: [RadioGroupComponent],
    }),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

export const Default: Story = {
  argTypes: {
    label: { control: { type: "text" } },
    description: { control: { type: "text" }, description: "String" },
    errorMsg: { control: { type: "text" }, description: "String" },
    disabled: { control: { type: "boolean" } },
    readOnly: { control: { type: "boolean" } },
    color: {
      options: GStatic.enumToArray(ColorEnum).map(({ value }) => value),
      control: { type: "select" },
      description: "ButtonColorEnum",
    },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    value: { description: "any" },
    onChange: { description: "(event: boolean) => void" },
  },
  args: {
    label: "Label",
    color: ColorEnum.Primary,
    size: SizeEnum.Medium,
    disabled: false,
    readOnly: false,
  },
};

export const WarningWithError: Story = {
  args: {
    ...Default.args,
    checked: true,
    size: SizeEnum.Large,
    color: ColorEnum.Warning,
    errorMsg: "Error message",
  },
};

export const withDescription: Story = {
  args: {
    ...Default.args,
    checked: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};

export const withDescriptionAndError: Story = {
  args: {
    ...Default.args,
    checked: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    errorMsg: "Error message",
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    label: "العنوان",
    description:
      'لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.',
    errorMsg: "نص الخطأ",
  },
};
