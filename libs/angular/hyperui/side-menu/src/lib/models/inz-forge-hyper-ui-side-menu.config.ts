import {InzForgeHyperUiSideMenuModes} from "./side-menu-modes.enum";
import {
  InzForgeHyperUiSideMenuItem,
  InzForgeHyperUiSideMenuLogo,
  InzForgeHyperUiSideMenuProfile
} from "./side-menu.models";

export interface InzForgeHyperUiSideMenuConfig {
  mode: InzForgeHyperUiSideMenuModes;
  logo?: InzForgeHyperUiSideMenuLogo;
  items: InzForgeHyperUiSideMenuItem[];
  profile?: InzForgeHyperUiSideMenuProfile;
  footerItems?: InzForgeHyperUiSideMenuItem[];
}
