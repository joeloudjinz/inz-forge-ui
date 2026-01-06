import {ChangeDetectionStrategy, Component, computed, effect, inject, input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {cn} from '@inz-forge-ui/utils';
import {InzSideMenuGroupComponent, InzSideMenuLinkComponent, InzSideMenuProfileComponent} from './components';
import {InzForgeHyperUiSideMenuManager} from "./services/side-menu-manager.service";
import {
  InzForgeHyperUiSideMenuItem,
  InzForgeHyperUiSideMenuLogo,
  InzForgeHyperUiSideMenuModes,
  InzForgeHyperUiSideMenuProfile
} from './models';

@Component({
  selector: 'inz-hyperui-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    InzSideMenuLinkComponent,
    InzSideMenuGroupComponent,
    InzSideMenuProfileComponent
  ],
  providers: [InzForgeHyperUiSideMenuManager],
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
  footerItems = input<InzForgeHyperUiSideMenuItem[] | undefined>([]);

  protected readonly manager = inject(InzForgeHyperUiSideMenuManager);

  protected readonly containerClasses = computed(() => {
    const base = 'flex h-screen flex-col justify-between border-e side-menu-root transition-all duration-300';
    return this.manager.isCompact()
      ? cn(base, 'w-16')
      : cn(base, 'w-64');
  });

  constructor() {
    effect(() => {
      this.manager.update({
        items: this.items(),
        mode: this.mode(),
        logo: this.logo(),
        profile: this.profile(),
        footerItems: this.footerItems()
      });
    });
  }
}
