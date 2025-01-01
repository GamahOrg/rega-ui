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

export const Default: Story = {};
