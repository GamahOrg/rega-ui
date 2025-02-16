// import { APP_INITIALIZER, Injector } from "@angular/core";
// import { AngularRenderer } from "@storybook/angular/dist/client/types";
// import { DecoratorFunction } from "storybook/internal/types";

// export const injectInjectorToProps = <TArgs = unknown>(): DecoratorFunction<
//   AngularRenderer,
//   TArgs
// > => {
//   return (storyFn, context) => {
//     const story = storyFn(context);

//     if (!story.applicationConfig) {
//       story.applicationConfig = { providers: [] };
//     }

//     story.applicationConfig.providers.push({
//       provide: APP_INITIALIZER,
//       useFactory: (injector: Injector): (() => void) => {
//         return () => {
//           if (!story.props) {
//             story.props = { injector };
//           }
//           Object.assign(story.props, { injector });
//         };
//       },
//       deps: [Injector],
//       multi: true,
//     });

//     return story;
//   };
// };

import { AngularRenderer } from "@storybook/angular";
import { DecoratorFunction } from "@storybook/types";

export const injectInjectorToProps: DecoratorFunction<AngularRenderer> = (
  storyFn,
  context: any
): any => {
  const story: any = storyFn(context);

  if (!story.props) story.props = {};
  if (context.parameters.injector) story.props.injector = context.parameters.injector;

  return story;
};
