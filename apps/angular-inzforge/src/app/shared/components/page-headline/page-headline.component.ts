import {Component, input} from "@angular/core";

@Component({
  selector: "inz-app-page-headline",
  standalone: true,
  template: `
    <h1 class="text-inz-3xl font-bold mb-inz-3 text-inz-foreground">{{ title() || "UNSPECIFIED HEADLINE TITLE" }}</h1>
    @if (!!subtitle()) {
      <h3 class="text-inz-lg font-light text-inz-muted-foreground mt-inz-1 mb-inz-3">{{ subtitle() }}</h3>
    }
  `
})
export class InzAppPageHeadlineComponent {
  title = input<string>("");
  subtitle = input<string | undefined>(undefined);
}
