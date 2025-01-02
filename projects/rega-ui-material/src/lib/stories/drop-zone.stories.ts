import { Meta, StoryObj } from "@storybook/angular";
import { DropZoneComponent } from "../components/drop-zone/drop-zone.component";
import { FilesListItem, GStatic, SizeEnum } from "../../utils";

const meta: Meta = {
  title: "Components/FileUpload/DropZone",
  component: DropZoneComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DropZoneComponent>;

export const Default: Story = {
  argTypes: {
    accept: { control: { type: "text" } },
    sizeLimit: { control: { type: "number" }, description: "In MB" },
    multiple: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    title: { control: { type: "text" } },
    description: { control: { type: "text" } },
    btnLabel: { control: { type: "text" } },
    dropzoneClass: { control: { type: "text" } },
    onFileDropped: { description: "(event: File[]) => void" },
  },
  args: {
    accept: "image/*,application/pdf",
    sizeLimit: 2,
    multiple: true,
    disabled: false,
    title: "Drag and drop files here to upload",
    description:
      "Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and.pdf.",
    btnLabel: "Browse Files",
    dropzoneClass: "",
    onFileDropped: (event: File[]): void => {},
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: {
    ...Default.args,
    title: "قم بسحب وإسقاط الملفات هنا للتحميل",
    description:
      "الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل تنسيقات الملفات المدعومة .jpg و.png و.pdf.",
    btnLabel: "تصفح الملفات",
  },
};
