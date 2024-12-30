import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

const meta: Meta = {
  title: "Components/Select/Autocomplete",
  decorators: [
    moduleMetadata({
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// Basic Select
export const Basic: Story = {
  render: () => ({
    template: `
      <mat-form-field>
        <mat-label>Select an option</mat-label>
        <mat-select>
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        </mat-select>
      </mat-form-field>
    `,
  }),
};

// Multiple Select
export const Multiple: Story = {
  render: () => ({
    template: `
      <mat-form-field>
        <mat-label>Multiple select</mat-label>
        <mat-select multiple>
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        </mat-select>
      </mat-form-field>
    `,
  }),
};

// Disabled Select
export const Disabled: Story = {
  render: () => ({
    template: `
      <mat-form-field>
        <mat-label>Disabled select</mat-label>
        <mat-select disabled>
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        </mat-select>
      </mat-form-field>
    `,
  }),
};

// With Form Control
export const WithFormControl: Story = {
  render: () => ({
    template: `
      <mat-form-field>
        <mat-label>With form control</mat-label>
        <mat-select [formControl]="control">
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        </mat-select>
      </mat-form-field>
    `,
    props: {
      control: new FormControl("option1"),
    },
  }),
};
