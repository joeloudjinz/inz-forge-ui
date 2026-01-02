import {Component} from "@angular/core";
import {InzForgeAppSimpleAnimatedTextLink} from "../simple-animated-text-link/simple-animated-text-link.component";

@Component({
  selector: "inz-app-navbar",
  imports: [
    InzForgeAppSimpleAnimatedTextLink
  ],
  template: `
    <div class="shadow-inz-lg bg-inz-background border-b border-inz-border">
      <div class="max-w-7xl mx-auto px-inz-4 sm:px-inz-6 lg:px-inz-8">
        <div class="flex-col justify-between items-center py-inz-4">
          <h1 class="text-inz-5xl font-bold text-inz-foreground">InzForge UI</h1>
          <h6 class="text-inz-sm">by
            <inz-app-simple-simple-animated-text-link link="https://abdellahaddoun.com">
              Abdellah Addoun - <span class="italic">JeoInz</span>
            </inz-app-simple-simple-animated-text-link>
          </h6>
        </div>
      </div>
    </div>
  `
})
export class InzForgeAppNavBarComponent {
}
