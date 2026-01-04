import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InzForgeHyperUiSideMenuProfile } from '../../side-menu-item.model';
import { InzForgeHyperUiSideMenuModes } from '../../side-menu-modes.enum';

@Component({
  selector: 'inz-side-menu-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white" [class.p-2]="isCompact()">
      <a [routerLink]="profile().profileRoute || []"
         class="flex items-center gap-2 hover:bg-gray-50 transition-colors"
         [class]="linkClasses()">

        <img [src]="profile().avatarUrl" [alt]="profile().name" class="size-10 rounded-full object-cover" />

        @if (!isCompact()) {
          <div>
            <p class="text-xs">
              <strong class="block font-medium text-gray-900">{{ profile().name }}</strong>
              <span class="text-gray-500"> {{ profile().email }} </span>
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
  profile = input.required<InzForgeHyperUiSideMenuProfile>();
  mode = input<InzForgeHyperUiSideMenuModes>(InzForgeHyperUiSideMenuModes.standard);

  isCompact = computed(() => this.mode() === InzForgeHyperUiSideMenuModes.compact);

  linkClasses = computed(() =>
    this.isCompact()
      ? 'justify-center rounded-lg p-2'
      : 'p-4'
  );
}