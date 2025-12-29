import { Component, input, ViewEncapsulation, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { InzForgeHyperUiAccordionItemModel } from "./accordion-item.model";
import { InzForgeHyperUiAccordionModes } from "./accordion-modes.enum";

@Component({
  selector: 'inz-hyperui-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class InzForgeHyperUiAccordionComponent {
  items = input<InzForgeHyperUiAccordionItemModel[]>([]);
  mode = input(InzForgeHyperUiAccordionModes.simple);
  isDark = input(false);
  isRTL = input(false);

  // Keyboard navigation for accessibility
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.target instanceof HTMLElement) {
      const summary = event.target.closest('summary');
      if (!summary) return;

      const details = summary.parentElement as HTMLDetailsElement;
      const allDetails = Array.from(details.parentElement?.querySelectorAll('details') || []);
      const currentIndex = allDetails.indexOf(details);

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          details.open = !details.open;
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (currentIndex < allDetails.length - 1) {
            (allDetails[currentIndex + 1] as HTMLDetailsElement).querySelector('summary')?.focus();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (currentIndex > 0) {
            (allDetails[currentIndex - 1] as HTMLDetailsElement).querySelector('summary')?.focus();
          }
          break;
        case 'Home':
          event.preventDefault();
          if (allDetails.length > 0) {
            (allDetails[0] as HTMLDetailsElement).querySelector('summary')?.focus();
          }
          break;
        case 'End':
          event.preventDefault();
          if (allDetails.length > 0) {
            (allDetails[allDetails.length - 1] as HTMLDetailsElement).querySelector('summary')?.focus();
          }
          break;
      }
    }
  }

  protected readonly InzForgeHyperUiAccordionModes = InzForgeHyperUiAccordionModes;
}
