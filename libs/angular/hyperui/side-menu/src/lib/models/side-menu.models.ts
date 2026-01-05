export interface InzForgeHyperUiSideMenuItem {
  label: string;
  route?: string[] | string;
  href?: string;
  iconClass?: string;
  iconHtml?: string;
  children?: InzForgeHyperUiSideMenuItem[];
  badge?: string;
  isExpandedByDefault?: boolean;
}

export interface InzForgeHyperUiSideMenuProfile {
  headline: string;
  subtitle?: string;
  avatarUrl: string;
  profileRoute?: string[] | string;
  externalUrl?: string;
}

export interface InzForgeHyperUiSideMenuLogo {
  text?: string;
  initials?: string;
  subtitle?: string;
}

