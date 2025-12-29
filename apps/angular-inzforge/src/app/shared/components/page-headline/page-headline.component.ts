import {Component, input} from "@angular/core";

@Component({
  selector: "inz-app-page-headline",
  standalone: true,
  template: `
    <h1 class="text-3xl font-bold mb-3">{{ title() || "UNSPECIFIED HEADLINE TITLE" }}</h1>
    @if (!!subtitle()) {
      <h3 class="text-md font-light text-gray-600 mt-1 mb-3">{{ subtitle() }}</h3>
    }
  `
})
export class InzAppPageHeadlineComponent {
  title = input<string>("");
  subtitle = input<string | undefined>(undefined);
}
