// import { Meta, applicationConfig, StoryObj } from "@storybook/angular";
// import { Toaster, ToasterComponent } from "../components";

// import { importProvidersFrom } from "@angular/core";

// const meta: Meta<Toaster> = {
//   component: Toaster,
//   title: "Components/Toaster",
//   tags: ["autodocs"],
//   decorators: [
//     applicationConfig({
//       providers: [importProvidersFrom([ToasterComponent])],
//     }),
//   ],
// };

// export default meta;
// type Story = StoryObj<Toaster>;

// export const Default: Story = {
//   argTypes: {},
// };

import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from "@storybook/angular";
import { Component, importProvidersFrom } from "@angular/core";
import { Toaster, ToasterComponent, ToasterService } from "../components";
import { CommonModule } from "@angular/common";

@Component({
  selector: "storybook-toaster-demo",
  template: `
    <button (click)="showToast('success')">Show Success Toast</button>
    <button (click)="showToast('error')">Show Error Toast</button>
    <button (click)="showToast('warning')">Show Warning Toast</button>
    <button (click)="showToast('info')">Show Info Toast</button>
  `,
})
class ToasterDemoComponent {
  constructor(private toaster: ToasterService) {}

  showToast(type: "success" | "error" | "warning" | "info"): void {
    this.toaster.show(`This is a ${type} toast!`, type);
  }
}

const meta: Meta<ToasterDemoComponent> = {
  title: "Components/Toaster",
  component: ToasterDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [Toaster],
      providers: [ToasterService],
    }),
    applicationConfig({
      providers: [importProvidersFrom([ToasterComponent, CommonModule])],
    }),
  ],
};

export default meta;

type Story = StoryObj<ToasterDemoComponent>;

export const Default: Story = {};
