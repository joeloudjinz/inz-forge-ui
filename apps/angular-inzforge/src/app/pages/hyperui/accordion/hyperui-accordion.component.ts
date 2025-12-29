import {Component, signal} from "@angular/core";
import {InzForgeHyperUiAccordionComponent, InzForgeHyperUiAccordionModes} from "@inz-forge-ui/accordion";
import {AccordionItems} from "./resources";
import {InzAppPageHeadlineComponent} from "../../../shared/components/page-headline/page-headline.component";

@Component({
  selector: "inz-app-hyperui-accordion",
  templateUrl: "./hyperui-accordion.component.html",
  imports: [
    InzForgeHyperUiAccordionComponent,
    InzAppPageHeadlineComponent
  ],
  standalone: true
})
export class InzForgeAppHyperUIAccordionPageComponent {
  protected mode = signal(InzForgeHyperUiAccordionModes.simple);
  protected isDark = signal(false);
  protected isRTL = signal(false);
  protected readonly AccordionItems = AccordionItems;
}
