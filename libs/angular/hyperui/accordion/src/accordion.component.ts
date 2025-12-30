import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InzForgeHyperUiAccordionItemModel} from './accordion-item.model';
import {InzForgeHyperUiAccordionModes} from './accordion-modes.enum';
import {cn} from '@inz-forge-ui/utils';

@Component({
  selector: 'inz-hyperui-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class InzForgeHyperUiAccordionComponent {
  items = input.required<InzForgeHyperUiAccordionItemModel[]>();
  mode = input<InzForgeHyperUiAccordionModes>(InzForgeHyperUiAccordionModes.simple);
  // If true, only one item can be open at a time. Uses the native HTML 'name' attribute for details.
  exclusive = input(false);

  containerClasses = computed(() => {
    const base = 'w-full';
    switch (this.mode()) {
      case InzForgeHyperUiAccordionModes.divided:
        return cn(base, '-mx-4 -my-2 space-y-0 divide-y divide-gray-200 dark:divide-gray-700');
      case InzForgeHyperUiAccordionModes.compact:
        return cn(base, 'space-y-1');
      case InzForgeHyperUiAccordionModes.simple:
      default:
        return cn(base, 'space-y-2');
    }
  });

  // --- Computed Classes (The "Brain" of the styling) ---
  // Summary (Header) Classes
  summaryClasses = computed(() => {
    const base = 'flex cursor-pointer items-center justify-between gap-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg';

    switch (this.mode()) {
      case InzForgeHyperUiAccordionModes.divided:
        // Divided: No background, just text color changes
        return cn(base, 'rounded-none px-4 py-3 text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200');

      case InzForgeHyperUiAccordionModes.compact:
        // Compact: Smaller padding, smaller text, background changes
        return cn(base, 'rounded px-3 py-2 text-sm text-gray-900 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700');

      case InzForgeHyperUiAccordionModes.simple:
      default:
        // Simple: Standard padding, border, background
        return cn(base, 'border border-gray-200 bg-white px-4 py-3 text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800');
    }
  });

  // Content (Body) Classes
  contentClasses = computed(() => {
    const base = 'text-gray-700 dark:text-gray-200';
    switch (this.mode()) {
      case InzForgeHyperUiAccordionModes.compact:
        return cn(base, 'p-3');
      case InzForgeHyperUiAccordionModes.divided:
        return cn(base, 'py-4');
      case InzForgeHyperUiAccordionModes.simple:
      default:
        return cn(base, 'p-4');
    }
  });

  // Generate a unique name for the accordion group if exclusive mode is on
  protected readonly groupName = signal(`accordion-${Math.random().toString(36).substring(2, 9)}`);
  protected readonly cn = cn;
  private el = inject(ElementRef);

  /**
   * Keyboard Navigation (Accessibility Enhancement)
   * Only handles Arrow keys/Home/End to move focus between headers.
   * Native <details> handles Enter/Space automatically.
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const isNavigation = ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key);
    if (!isNavigation) return;

    const summary = (event.target as HTMLElement).closest('summary');
    if (!summary) return;

    event.preventDefault(); // Prevent page scroll

    const summaries = Array.from(
      this.el.nativeElement.querySelectorAll('summary')
    ) as HTMLElement[];
    const index = summaries.indexOf(summary as HTMLElement);

    if (index === -1) return;

    let nextIndex = index;
    if (event.key === 'ArrowDown') nextIndex = Math.min(index + 1, summaries.length - 1);
    if (event.key === 'ArrowUp') nextIndex = Math.max(index - 1, 0);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = summaries.length - 1;

    summaries[nextIndex]?.focus();
  }
}
