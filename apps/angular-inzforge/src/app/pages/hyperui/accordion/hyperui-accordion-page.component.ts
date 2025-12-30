import {Component, signal} from "@angular/core";
import {InzForgeHyperUiAccordionComponent, InzForgeHyperUiAccordionModes} from "@inz-forge-ui/accordion";
import {AccordionItems} from "./resources";
import {InzAppPageHeadlineComponent} from "../../../shared/components/page-headline/page-headline.component";

@Component({
  selector: "inz-app-hyperui-accordion",
  templateUrl: "./hyperui-accordion-page.component.html",
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

  protected toggleDarkMode() {
    this.isDark.set(!this.isDark());
  }

  protected toggleDirection() {
    this.isRTL.set(!this.isRTL());
  }
}

interface ModeButtonGroupOption {
  key: string;
  label: string;
  value: InzForgeHyperUiAccordionModes;
  isFirst?: boolean;
  isLast?: boolean;
}
