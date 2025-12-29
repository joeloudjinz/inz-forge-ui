import {Route} from '@angular/router';
import {InzForgeAppHomePageComponent} from "./pages/home/home.component";
import {InzForgeAppHyperUIAccordionPageComponent} from "./pages/hyperui/accordion/hyperui-accordion.component";

export const appRoutes: Route[] = [
  {
    path: '',
    component: InzForgeAppHomePageComponent
  },
  {
    path: "hyperui",
    // TODO add a page component
    children: [
      {
        path: 'accordion',
        component: InzForgeAppHyperUIAccordionPageComponent
      }
    ]
  }
];
