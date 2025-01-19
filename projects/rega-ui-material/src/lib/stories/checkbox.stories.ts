import { Meta, StoryObj } from "@storybook/angular";
import { CheckboxComponent } from "../components";
import { ColorEnum, GStatic, SizeEnum } from "../../utils";
const meta: Meta<CheckboxComponent> = {
  title: "Components/Checkbox",
  component: CheckboxComponent,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<CheckboxComponent>;
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
    label: { control: { type: "text" } },
    errorMsg: { control: { type: "text" }, description: "String" },
    description: { control: { type: "text" }, description: "String" },
    disabled: { control: { type: "boolean" }, description: "Boolean" },
    valueChange: { description: "(event: boolean) => void" },
  },
  args: { label: "Label" },
};
export const WithError: Story = {
  args: { ...Default.args, errorMsg: "Error Message" },
};
export const WithDescription: Story = {
  args: {
    ...Default.args,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};
export const WithDescriptionAndError: Story = {
  args: {
    ...Default.args,
    errorMsg: "Error Message",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
