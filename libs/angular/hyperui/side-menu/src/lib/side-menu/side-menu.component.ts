import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@inz-forge-ui/utils';

// Import Atoms
import { InzSideMenuLinkComponent } from '../components/side-menu-link/side-menu-link.component';
import { InzSideMenuGroupComponent } from '../components/side-menu-group/side-menu-group.component';
import { InzSideMenuProfileComponent } from '../components/side-menu-profile/side-menu-profile.component';

// Import Models
import { InzForgeHyperUiSideMenuItem, InzForgeHyperUiSideMenuProfile, InzForgeHyperUiSideMenuLogo } from './side-menu-item.model';
import { InzForgeHyperUiSideMenuModes } from './side-menu-modes.enum';

@Component({
  selector: 'inz-hyperui-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    InzSideMenuLinkComponent,
    InzSideMenuGroupComponent,
    InzSideMenuProfileComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class InzForgeHyperUiSideMenuComponent {
  items = input.required<InzForgeHyperUiSideMenuItem[]>();
  mode = input<InzForgeHyperUiSideMenuModes>(InzForgeHyperUiSideMenuModes.standard);
  logo = input<InzForgeHyperUiSideMenuLogo>();
  profile = input<InzForgeHyperUiSideMenuProfile>();
  footerItems = input<InzForgeHyperUiSideMenuItem[]>([]);

  protected readonly cn = cn;

  containerClasses = computed(() => {
    const base = 'flex h-screen flex-col justify-between border-e border-gray-100 bg-white transition-all duration-300';
    return this.mode() === InzForgeHyperUiSideMenuModes.compact
      ? cn(base, 'w-16')
      : cn(base, 'w-64');
  });

  isCompact = computed(() => this.mode() === InzForgeHyperUiSideMenuModes.compact);
}