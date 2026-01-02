import {Component, computed, input} from "@angular/core";

@Component({
  selector: "inz-app-showcase-component-source-code-link",
  template: `
    @if (link()) {
      <div class="py-inz-3">
        <div class="flex justify-between">
          <p>
            You can find the source code on
            <a [href]="full()" class="hover:font-bold hover:underline transition-all fade-out duration-500" target="_blank">GitHub</a>
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
