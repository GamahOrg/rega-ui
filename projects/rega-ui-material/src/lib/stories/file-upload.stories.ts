import { Meta, StoryObj } from "@storybook/angular";
import { FileUploadComponent } from "../components/file-upload/file-upload.component";

const meta: Meta = {
  title: "Components/FileUpload/FileUpload",
  component: FileUploadComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  argTypes: {},
  args: {},
};
