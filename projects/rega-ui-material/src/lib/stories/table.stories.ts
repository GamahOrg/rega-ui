import { Meta, StoryObj } from "@storybook/angular";
import { TableComponent } from "../components";

const meta: Meta<TableComponent> = {
  title: "Components/Table",
  component: TableComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Default: Story = {
  argTypes: {
    data: { control: { type: "object" }, description: "Type of any[]" },
    colSpan: { control: { type: "number" }, description: "Count of columns" },
    extendable: { control: { type: "boolean" } },
    reorder: { control: { type: "boolean" }, description: "Reorder table rows" },
    contained: { control: { type: "boolean" } },
    columnDivider: { control: { type: "boolean" } },
    alternatingRows: { control: { type: "boolean" } },
    loading: { control: { type: "boolean" } },
    lazy: {
      control: { type: "boolean" },
      description:
        "Lazy is a performance-approach to handle huge data efficiently. Setting [lazy] property as true and providing a [virtualScrollItemSize] in pixels would be enough to enable this functionality. It is also suggested to use the same virtualScrollItemSize value on the tr element inside the body template, By default 32.",
    },
    rowsCount: {
      control: { type: "number" },
      description: "Number of rows to display per page.",
    },
    scrollHeight: {
      control: { type: "text" },
      description:
        "Adding scrollable property along with a scrollHeight for the data viewport enables vertical scrolling with fixed headers.",
    },
    virtualScrollItemSize: {
      control: { type: "number" },
      description:
        "It is also suggested to use the same virtualScrollItemSize value on the tr element inside the body template, By default 32.",
    },
    emptyMessage: { control: { type: "text" }, description: "Empty data message" },
    tableClass: { control: { type: "text" } },
    headerTemp: {
      control: { type: "object" },
      description: "ContentChild with Template variable #headerTemp",
    },
    bodyTemp: {
      control: { type: "object" },
      description: "ContentChild with Template variable #bodyTemp",
    },
    footerTemp: {
      control: { type: "object" },
      description: "ContentChild with Template variable #footerTemp",
    },
    extendableArea: {
      control: { type: "object" },
      description: "ContentChild with Template variable #extendableArea",
    },
    emptyMessageTemp: {
      control: { type: "object" },
      description: "ContentChild with Template variable #emptyMessageTemp",
    },
    onRowClick: { description: "(event: any) => void" },
    onLazyLoad: { description: "(event: TableLazyLoadEvent) => void" },
  },
  args: {
    data: Array.from({ length: 12 }, (_, id) => ({ id, label: "Item label " + id })),
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-96">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}, {id: 7, label: 'Item label 7'}, {id: 8, label: 'Item label 8'}, {id: 9, label: 'Item label 9'}, {id: 10, label: 'Item label 10'}, {id: 11, label: 'Item label 11'}]"
        [reorder]="${args.reorder}"
        [extendable]="${args.extendable}"
        [contained]="${args.contained}"
        [columnDivider]="${args.columnDivider}"
        [alternatingRows]="${args.alternatingRows}"
        [loading]="${args.loading}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row>
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const Contained: Story = {
  args: {
    ...Default.args,
    contained: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}]"
        [contained]="${args.contained}"
        scrollHeight="21rem"
        >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const ColumnDividerWithContained: Story = {
  args: {
    ...Default.args,
    contained: true,
    columnDivider: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}]"
        [contained]="${args.contained}"
        [columnDivider]="${args.columnDivider}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const AlternatingRows: Story = {
  args: {
    ...Default.args,
    alternatingRows: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}]"
        [alternatingRows]="${args.alternatingRows}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}]"
        [loading]="${args.loading}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const ExtendableWithAlternatingRows: Story = {
  args: {
    ...Default.args,
    extendable: true,
    alternatingRows: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}]"
        [extendable]="${args.extendable}"
        [alternatingRows]="${args.alternatingRows}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th></th>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="flex justify-center items-center">
              <button class="flex justify-center items-center p-1 hover:bg-slate-100 rounded-full">
                <span class="material-icons text-gray-600">{{expanded ? 'expand_more':'chevron_right'}}</span>
              </button>
          </td>
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>

         <ng-template #extendableArea let-row>
          <h5 class="text-center py-8">{{ row | json }}</h5>
         </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const ReorderWithAlternatingRows: Story = {
  args: {
    ...Default.args,
    reorder: true,
    alternatingRows: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}]"
        [reorder]="${args.reorder}"
        [alternatingRows]="${args.alternatingRows}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th></th>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="flex justify-center items-center">
              <button class="flex justify-center items-center cursor-move p-1 hover:bg-slate-100 rounded-full">
                <span class="material-icons text-gray-600">drag_indicator</span>
              </button>
          </td>
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const lazyWithAlternatingRows: Story = {
  args: {
    ...Default.args,
    alternatingRows: true,
    lazy: true,
    scrollHeight: "20rem",
    virtualScrollItemSize: 32,
    rowsCount: 5,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-80">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}, {id: 3, label: 'Item label 3'}, {id: 4, label: 'Item label 4'}, {id: 5, label: 'Item label 5'}, {id: 6, label: 'Item label 6'}, {id: 7, label: 'Item label 7'}, {id: 8, label: 'Item label 8'}, {id: 9, label: 'Item label 9'}, {id: 10, label: 'Item label 10'}, {id: 11, label: 'Item label 11'}]"
        [lazy]="${args.lazy}"
        [rowsCount]="${args.rowsCount}"
        [virtualScrollItemSize]="${args.virtualScrollItemSize}"
        [alternatingRows]="${args.alternatingRows}"
        scrollHeight="20rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const EmptyMessageTemplate: Story = {
  args: {
    ...Default.args,
    data: [],
    contained: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[]"
        [contained]="${args.contained}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>

         <ng-template #emptyMessageTemp let-row>
           <div class="flex justify-center items-center p-8">
              No data found 😑!
           </div>
         </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};

export const FooterTemplate: Story = {
  args: {
    ...Default.args,
    data: [],
    contained: true,
  },
  render: (args) => {
    return {
      args,
      template: `
    <div class="h-auto">  
      <rega-table
        [data]="[{id: 0, label: 'Item label 0'}, {id: 1, label: 'Item label 1'}, {id: 2, label: 'Item label 2'}]"
        [contained]="${args.contained}"
        scrollHeight="21rem"
      >
        <ng-template #headerTemp>
          <th>Name</th>
          <th>Country</th>
          <th>Company</th>
          <th>Representative</th>
        </ng-template>

        <ng-template #bodyTemp let-row let-expanded="expanded">
          <td class="w-6">{{ row.id }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
          <td class="w-48">{{ row.label }}</td>
        </ng-template>

         <ng-template #footerTemp let-row>
           <div class="flex justify-center items-center p-8">
              Footer
           </div>
         </ng-template>
      </rega-table>
    </div>
      `,
    };
  },
};
