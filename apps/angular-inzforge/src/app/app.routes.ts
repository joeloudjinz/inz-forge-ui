import {Route} from '@angular/router';
import {InzForgeAppHomePageComponent} from "./pages/home/home.component";

export const appRoutes: Route[] = [
  {
    path: '',
    component: InzForgeAppHomePageComponent,
    data: { label: 'Home' }
  }
];
