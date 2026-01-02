import {Component, computed, input} from "@angular/core";
import {InzForgeAppSimpleAnimatedTextLink} from "../simple-animated-text-link/simple-animated-text-link.component";

@Component({
  selector: "inz-app-showcase-component-source-code-link",
  imports: [
    InzForgeAppSimpleAnimatedTextLink
  ],
  template: `
    @if (link()) {
      <div class="py-inz-3">
        <div class="flex justify-between">
          <p>
            You can find the source code on
            <inz-app-simple-simple-animated-text-link [link]="full()">
              GitHub
            </inz-app-simple-simple-animated-text-link>
          </p>
        </div>
      </div>
    }

  `
})
export class InzForgeAppSourceCodeLinkComponent {
  private readonly BASE_URL: string = "https://github.com/joeloudjinz/inz-forge-ui/tree/main/libs/angular/";
  link = input("");
  protected full = computed(() => `${this.BASE_URL}${this.link()}`);
}
