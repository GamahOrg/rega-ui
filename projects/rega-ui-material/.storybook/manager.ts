import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark', // or 'dark'
    brandTitle: 'REGA Dega UI',
    brandUrl: 'https://rega-dga.vercel.app', // Optional: Change link when clicking on the title
    brandImage: 'https://rega.gov.sa/images/logos/REGA_LOGO_White.svg', // Optional: Custom logo instead of text
    brandTarget: '_self', // Opens in same tab
  }),
});

// Force update the tab title after Storybook loads
setTimeout(() => {
  document.title = 'REGA Dega UI';
}, 500); // Delay to allow Storybook to set its own title first
