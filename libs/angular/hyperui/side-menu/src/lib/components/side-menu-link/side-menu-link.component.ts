import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cn } from '@inz-forge-ui/utils';
import { InzForgeHyperUiSideMenuItem } from '../../models/side-menu.models';
import { InzForgeHyperUiSideMenuManager } from '../../services/side-menu-manager.service';

@Component({
  selector: 'inz-side-menu-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a
      [routerLink]="item().route"
      [href]="item().href"
      [class]="linkClasses()"
      routerLinkActive="bg-gray-100 text-gray-700">

      <!-- Icon -->
      @if (item().iconHtml) {
        <span [class]="iconClasses()" [innerHTML]="item().iconHtml"></span>
      } @else if (item().iconClass) {
        <i [class]="cn(iconClasses(), item().iconClass)"></i>
      }

      <!-- Text Logic -->
      @if (manager.isCompact()) {
        <span class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible z-50 whitespace-nowrap">
          {{ item().label }}
        </span>
      } @else {
        <span class="text-sm font-medium"> {{ item().label }} </span>
      }

      <!-- Badge (Standard Mode Only) -->
      @if (!manager.isCompact() && item().badge) {
        <span class="ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200">
          {{ item().badge }}
        </span>
      }
    </a>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InzSideMenuLinkComponent {
  protected readonly manager = inject(InzForgeHyperUiSideMenuManager);
  protected readonly cn = cn;

  item = input.required<InzForgeHyperUiSideMenuItem>();

  protected readonly linkClasses = computed(() => {
    const base = 'group relative flex items-center rounded-lg transition-colors';

    if (this.manager.isCompact()) {
      return cn(base, 'justify-center px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700');
    }

    return cn(base, 'px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 gap-2');
  });

  protected readonly iconClasses = computed(() => {
    const base = 'shrink-0 opacity-75';
    return cn(base, 'size-5');
  });
}
