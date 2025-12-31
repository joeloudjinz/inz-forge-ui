import {Component, inject, signal} from "@angular/core";
import {InzForgeHyperUiAccordionComponent, InzForgeHyperUiAccordionModes} from "@inz-forge-ui/accordion";
import {AccordionItems} from "./resources";
import {InzAppPageHeadlineComponent} from "../../../shared/components/page-headline/page-headline.component";
import {
  InzForgeAppShowcaseContainerService
} from "../../../shared/components/showcase-container/showcase-container.service";
import {
  InzForgeAppShowcaseContainerComponent
} from "../../../shared/components/showcase-container/showcase-container.component";
import {
  InzAppDarkRtlButtonsGroupComponent
} from "../../../shared/components/dark-rtl-buttons-group/dark-rtl-buttons-group.component";

@Component({
  selector: "inz-app-hyperui-accordion",
  templateUrl: "./hyperui-accordion-page.component.html",
  imports: [
    InzForgeHyperUiAccordionComponent,
    InzAppPageHeadlineComponent,
    InzForgeAppShowcaseContainerComponent,
    InzAppDarkRtlButtonsGroupComponent
  ],
  providers: [
    InzForgeAppShowcaseContainerService
  ],
  standalone: true
})
export class InzForgeAppHyperUIAccordionPageComponent {
  protected showcaseContainerService = inject(InzForgeAppShowcaseContainerService);
  protected readonly AccordionItems = AccordionItems;
  protected mode = signal(InzForgeHyperUiAccordionModes.simple);
  protected readonly modeButtonGroupOptions: ModeButtonGroupOption[] = [
    {
      key: "simple",
      label: "Simple",
      value: InzForgeHyperUiAccordionModes.simple,
      isFirst: true,
      isLast: false
    },
    {
      key: "compact",
      label: "Compact",
      value: InzForgeHyperUiAccordionModes.compact,
      isFirst: false,
      isLast: false
    },
    {
      key: "divided",
      label: "Divided",
      value: InzForgeHyperUiAccordionModes.divided,
      isFirst: false,
      isLast: true
    }
  ];

  protected setMode(modeKey: string) {
    const selectedMode = this.modeButtonGroupOptions.find(option => option.key === modeKey);
    if (selectedMode) {
      this.mode.set(selectedMode.value);
    } else {
      this.mode.set(InzForgeHyperUiAccordionModes.simple);
    }
  }
}

interface ModeButtonGroupOption {
  key: string;
  label: string;
  value: InzForgeHyperUiAccordionModes;
  isFirst?: boolean;
  isLast?: boolean;
}
