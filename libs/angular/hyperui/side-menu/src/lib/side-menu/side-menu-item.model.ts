export interface InzForgeHyperUiSideMenuItem {
  label: string;
  // Support both RouterLink (internal) and href (external)
  route?: string[] | string;
  href?: string;
  // Icon handling: CSS class (e.g., FontAwesome) or raw SVG/HTML
  iconClass?: string;
  iconHtml?: string;
  // Submenu items (only for 'standard' mode)
  children?: InzForgeHyperUiSideMenuItem[];
  // Optional badges or metadata
  badge?: string;
  // State for defaults
  isExpandedByDefault?: boolean;
}

export interface InzForgeHyperUiSideMenuProfile {
  name: string;
  email: string;
  avatarUrl: string;
  profileRoute?: string[] | string;
}

export interface InzForgeHyperUiSideMenuLogo {
  text?: string;
  // Helper to render simple initials like the 'L' in the compact example
  initials?: string;
  logoUrl?: string;
}
