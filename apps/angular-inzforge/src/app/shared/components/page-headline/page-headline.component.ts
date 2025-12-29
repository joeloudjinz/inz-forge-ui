import {Component, input} from "@angular/core";

@Component({
  selector: "inz-app-page-headline",
  standalone: true,
  template: `
    <!--  TODO add styling  -->
    <h1>{{ title() || "UNSPECIFIED HEADLINE TITLE" }}</h1>
    @if (!!subtitle()) {
      <h3>{{ subtitle() }}</h3>
    }
  `
})
export class InzAppPageHeadlineComponent {
  title = input<string>("");
  subtitle = input<string | undefined>(undefined);
}
