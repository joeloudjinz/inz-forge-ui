import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InzForgeAppSidebarComponent } from './shared/components/app-sidebare/sidebar.component';
import {InzForgeAppNavBarComponent} from "./shared/components/app-navbar/app-navbar.component";

@Component({
  imports: [RouterModule, InzForgeAppSidebarComponent, InzForgeAppNavBarComponent],
  standalone: true,
  selector: 'inz-app-root',
  templateUrl: './app.html'
})
export class App {
}
