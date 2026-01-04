import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InzSideMenuLinkComponent } from '../side-menu-link/side-menu-link.component';
import { InzForgeHyperUiSideMenuItem } from '../../side-menu-item.model';
import { InzForgeHyperUiSideMenuModes } from '../../side-menu-modes.enum';

@Component({
  selector: 'inz-side-menu-group',
  standalone: true,
  imports: [CommonModule, InzSideMenuLinkComponent],
  template: `
    <!-- Standard Mode: Accordion -->
    @if (!isCompact()) {
      <details class="group [&_summary::-webkit-details-marker]:hidden" [open]="item().isExpandedByDefault">
        <summary class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <div class="flex items-center gap-2">
            <!-- Optional Icon on Group Header -->
            @if (item().iconClass) { <i [class]="item().iconClass + ' size-5 opacity-75'"></i> }
            <span class="text-sm font-medium"> {{ item().label }} </span>
          </div>

          <span class="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
        </summary>

        <ul class="mt-2 space-y-1 px-4">
          @for (subItem of item().children; track $index) {
            <li>
              <inz-side-menu-link [item]="subItem" [mode]="mode()" />
            </li>
          }
        </ul>
      </details>
    }
    <!-- Compact Mode: Flatten the Group (HyperUI Compact doesn't usually do nested popovers, we render triggers as links) -->
    @else {
       <!-- In compact mode, groups act as separators or we just show the children flat if desired.
            For this design, we'll render the group header as a link-like trigger (but non-clickable)
            or just render children. Let's render children for usability. -->
       @for (subItem of item().children; track $index) {
          <inz-side-menu-link [item]="subItem" [mode]="mode()" />
       }
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InzSideMenuGroupComponent {
  item = input.required<InzForgeHyperUiSideMenuItem>();
  mode = input<InzForgeHyperUiSideMenuModes>(InzForgeHyperUiSideMenuModes.standard);
  isCompact = computed(() => this.mode() === InzForgeHyperUiSideMenuModes.compact);
}