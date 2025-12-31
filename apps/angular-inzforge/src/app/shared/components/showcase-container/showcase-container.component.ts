import {Component, inject} from "@angular/core";
import {InzForgeAppShowcaseContainerService} from "./showcase-container.service";

@Component({
  selector: "inz-app-component-showcase-container",
  standalone: true,
  template: `
    <div
      class="p-inz-10 border-2 inz-border rounded-inz-md bg-inz-background transition-colors duration-300"
      [class.bg-inz-foreground]="this.myService.isDarkModeOn()"
      [attr.dir]="this.myService.isRtlDirection() ? 'rtl' : 'ltr'">

      <ng-content></ng-content>

    </div>
  `
})
export class InzForgeAppShowcaseContainerComponent {
  protected myService = inject(InzForgeAppShowcaseContainerService);
}
