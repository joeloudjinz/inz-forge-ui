import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InzForgeAppSidebarComponent } from './shared/components/app-sidebare/sidebar.component';
import {InzForgeAppNavBarComponent} from "./shared/components/app-navbar/app-navbar.component";

@Component({
  imports: [RouterModule, InzForgeAppSidebarComponent, InzForgeAppNavBarComponent],
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
  protected title = 'InzForge UI - Angular Showroom';
}
