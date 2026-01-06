import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InzForgeHyperUiSideMenuProfile } from "../../models/side-menu.models";
import { InzForgeHyperUiSideMenuManager } from '../../services/side-menu-manager.service';

@Component({
  selector: 'inz-side-menu-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <div class="sticky inset-x-0 bottom-0 border-t side-menu-border-top side-menu-root"
         [class.p-2]="manager.isCompact()">

      <a [routerLink]="profile().profileRoute || []"
         class="flex items-center gap-2 side-menu-item transition-colors"
         [class]="linkClasses()">

        <img [ngSrc]="profile().avatarUrl" [alt]="profile().headline" class="rounded-full object-cover" width="40"
             height="40"/>

        @if (!manager.isCompact()) {
          <div>
            <p class="text-xs">
              <strong class="block font-medium side-menu-text-main">{{ profile().headline }}</strong>
              @if (!!profile().subtitle) {
                <span class="side-menu-text-sub"> {{ profile().subtitle }} </span>
              }
            </p>
          </div>
        }
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InzSideMenuProfileComponent {
  protected readonly manager = inject(InzForgeHyperUiSideMenuManager);

  profile = input.required<InzForgeHyperUiSideMenuProfile>();

  protected readonly linkClasses = computed(() =>
    this.manager.isCompact()
      ? 'justify-center rounded-lg p-2'
      : 'p-4'
  );
}
