import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/components/app-sidebare/sidebar.component';

@Component({
  imports: [RouterModule, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
  protected title = 'InzForge UI - Angular Showroom';
}
