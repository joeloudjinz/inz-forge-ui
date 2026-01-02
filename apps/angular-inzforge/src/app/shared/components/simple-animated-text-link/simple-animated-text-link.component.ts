import {Component, input} from "@angular/core";

@Component({
  selector: "inz-app-simple-simple-animated-text-link",
  template: `
    <a [href]="link()" class="hover:font-bold hover:underline transition-all fade-out duration-500" target="_blank">
      <ng-content></ng-content>
    </a>
  `
})
export class InzForgeAppSimpleAnimatedTextLink {
  link = input("");
}
