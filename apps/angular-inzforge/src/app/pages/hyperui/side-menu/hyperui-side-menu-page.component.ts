import {Component, inject, signal} from "@angular/core";
import {InzForgeHyperUiSideMenuComponent, InzForgeHyperUiSideMenuModes} from "@inz-forge-ui/angular/hyperui/side-menu";
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
import {
  InzForgeAppSourceCodeLinkComponent
} from "../../../shared/components/source-code-link/source-code-link.component";
import {SideMenuFooterItems, SideMenuItems, SideMenuLogo, SideMenuProfile} from './resources';

@Component({
  selector: "inz-app-hyperui-side-menu",
  templateUrl: "./hyperui-side-menu-page.component.html",
  imports: [
    InzForgeHyperUiSideMenuComponent,
    InzAppPageHeadlineComponent,
    InzForgeAppShowcaseContainerComponent,
    InzAppDarkRtlButtonsGroupComponent,
    InzForgeAppSourceCodeLinkComponent
  ],
  providers: [
    InzForgeAppShowcaseContainerService
  ],
  standalone: true
})
export class InzForgeAppHyperUISideMenuPageComponent {
  SideMenuItems = SideMenuItems;
  SideMenuLogo = SideMenuLogo;
  SideMenuProfile = SideMenuProfile;
  SideMenuFooterItems = SideMenuFooterItems;
  protected showcaseContainerService = inject(InzForgeAppShowcaseContainerService);
  protected mode = signal(InzForgeHyperUiSideMenuModes.standard);
  protected readonly modeButtonGroupOptions: ModeButtonGroupOption[] = [
    {
      key: "standard",
      label: "Standard",
      value: InzForgeHyperUiSideMenuModes.standard,
      isFirst: true,
      isLast: false
    },
    {
      key: "compact",
      label: "Compact",
      value: InzForgeHyperUiSideMenuModes.compact,
      isFirst: false,
      isLast: true
    }
  ];

  protected setMode(modeKey: string) {
    const selectedMode = this.modeButtonGroupOptions.find(option => option.key === modeKey);
    if (selectedMode) {
      this.mode.set(selectedMode.value);
    } else {
      this.mode.set(InzForgeHyperUiSideMenuModes.standard);
    }
  }
}

interface ModeButtonGroupOption {
  key: string;
  label: string;
  value: InzForgeHyperUiSideMenuModes;
  isFirst?: boolean;
  isLast?: boolean;
}
