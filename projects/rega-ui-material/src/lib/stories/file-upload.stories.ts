import { Meta, StoryObj } from "@storybook/angular";
import { FileUploadComponent } from "../components/file-upload/file-upload.component";
import { GStatic, SizeEnum } from "../../utils";

const meta: Meta = {
  title: "Components/FileUpload/FileUpload",
  component: FileUploadComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  argTypes: {
    label: { control: { type: "text" } },
    accept: { control: { type: "text" } },
    sizeLimit: { control: { type: "number" }, description: "In MB" },
    multiple: { control: { type: "boolean" } },
    onSelectFiles: { description: "(event: File[]) => void" },
    btnSize: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    btnLoading: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    btnClass: { control: { type: "text" } },
  },
  args: {
    label: "Browse Files",
    accept: "image/*,application/pdf",
    sizeLimit: 2,
    multiple: false,
    onSelectFiles: (event: File[]): void => {},
    btnSize: SizeEnum.Medium,
    btnLoading: false,
    disabled: false,
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    label: "تصفح الملفات",
  },
};
