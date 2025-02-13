import { Meta, StoryObj } from "@storybook/angular";
import { PaginationComponent } from "../components";
import { GStatic, SizeEnum } from "../../utils";

const meta: Meta = {
  title: "Components/Pagination",
  component: PaginationComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  argTypes: {
    count: {
      name: "count",
      type: { name: "number", required: true },
      default: 100,
      description: "Total length",
    },
    currentPage: {
      type: { name: "number", required: true },
      description: "Selected page index",
      default: 1,
    },
    siblingCount: { type: "number", default: 1 },
    size: {
      options: GStatic.enumToArray(SizeEnum).map(({ value }) => value),
      control: { type: "radio" },
      description: "SizeEnum",
    },
    numberTemp: {
      control: { type: "object" },
      description:
        "ContentChild with Template variable #numberTemp; extract page as default variable and also isActive",
    },
    previousTemp: {
      control: { type: "object" },
      description:
        "ContentChild with Template variable #previousTemp, extract current page as default variable and also disabled",
    },
    nextTemp: {
      control: { type: "object" },
      description:
        "ContentChild with Template variable #nextTemp, extract current page as default variable and also disabled",
    },
    onPageChange: { description: "(event: number) => void" },
  },
  args: {
    count: 100,
    currentPage: 1,
    siblingCount: 1,
    size: SizeEnum.Medium,
  },
};

export const CustomPagination: Story = {
  args: { ...Default.args },
  render: (args) => {
    return {
      args,
      template: `
        <rega-pagination
          #pagination
          [count]="${args.count}"
          [currentPage]="${args.currentPage}"
          [siblingCount]="${args.siblingCount}"
          size="medium"
        >
          <ng-template #previousTemp let-currentP><span class="h-8 w-8  flex justify-center items-center cursor-pointer material-icons text-[#384250]" (click)="currentP !== 1 && pagination.pageChange(currentP - 1)">chevron_left</span></ng-template>

          <ng-template #numberTemp let-page let-isActive="isActive"> 
            <span class="h-8 w-8 flex justify-center items-center rounded-full border-2 cursor-pointer {{isActive ? 'bg-primaryColor text-white shadow' : 'border-white'}}" (click)="pagination.pageChange(page)">{{ page }}</span> 
          </ng-template>
          
          <ng-template #nextTemp let-currentP><span class="h-8 w-8 flex justify-center items-center cursor-pointer material-icons text-[#384250]" (click)="currentP !== ${args.count} && pagination.pageChange(currentP + 1)">navigate_next</span></ng-template>
        </rega-pagination>
      `,
    };
  },
};

export const RTL: Story = {
  parameters: { direction: "rtl", dir: "rtl" },
  args: { ...Default.args },
};
