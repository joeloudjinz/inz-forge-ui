import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  InzForgeHyperUiAccordionComponent,
  InzForgeHyperUiAccordionItemModel,
  InzForgeHyperUiAccordionModes
} from '../src';
import {vi} from 'vitest';

describe('InzForgeHyperUiAccordionComponent', () => {
  let component: InzForgeHyperUiAccordionComponent;
  let fixture: ComponentFixture<InzForgeHyperUiAccordionComponent>;

  const mockItems: InzForgeHyperUiAccordionItemModel[] = [
    {title: 'Q1', description: 'Desc 1', isExpandedByDefault: false},
    {title: 'Q2', description: 'Desc 2', isExpandedByDefault: true},
    {title: 'Q3', description: 'Desc 3', isExpandedByDefault: false}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzForgeHyperUiAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InzForgeHyperUiAccordionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  describe('Basic Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render correct number of items', () => {
      const details = fixture.nativeElement.querySelectorAll('details');
      expect(details.length).toBe(3);
    });

    it('should respect default expansion state', () => {
      const details = fixture.nativeElement.querySelectorAll('details');
      expect(details[0].hasAttribute('open')).toBe(false);
      expect(details[1].hasAttribute('open')).toBe(true); // Q2 is expanded by default
    });
  });

  describe('Computed Classes (Styles)', () => {
    it('should apply divided mode classes', () => {
      fixture.componentRef.setInput('mode', InzForgeHyperUiAccordionModes.divided);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.inz-accordion-container');
      expect(container.className).toContain('divide-y');
      expect(container.className).toContain('-mx-4');
    });

    it('should apply compact mode classes', () => {
      fixture.componentRef.setInput('mode', InzForgeHyperUiAccordionModes.compact);
      fixture.detectChanges();

      const summary = fixture.nativeElement.querySelector('summary');
      expect(summary.className).toContain('text-sm');
      expect(summary.className).toContain('py-2');
    });
  });

  describe('Icon Rendering Logic', () => {
    it('should not render custom icons when not provided', () => {
      const contentIcons = fixture.nativeElement.querySelectorAll('.inz-accordion-summary > span > i');
      const componentIcons = fixture.nativeElement.querySelectorAll('.inz-accordion-summary > span > span.size-5');

      expect(contentIcons.length).toBe(0);
      expect(componentIcons.length).toBe(0);
    });

    it('should render icon class when provided', () => {
      const itemsWithIcons = [{...mockItems[0], iconClass: 'test-icon-class'}];
      fixture.componentRef.setInput('items', itemsWithIcons);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.inz-accordion-summary > span > i');
      expect(icon).toBeTruthy();
      expect(icon.className).toContain('test-icon-class');
    });
  });

  describe('Interaction Logic', () => {
    it('should handle exclusive mode (radio behavior)', () => {
      fixture.componentRef.setInput('exclusive', true);
      fixture.detectChanges();

      const details = fixture.nativeElement.querySelectorAll('details');
      const groupName = component['groupName'](); // Access protected signal

      // In exclusive mode, details share a 'name' attribute
      expect(details[0].getAttribute('name')).toBe(groupName);
      expect(details[1].getAttribute('name')).toBe(groupName);
    });

    it('should move focus on arrow navigation', () => {
      const summaries = fixture.nativeElement.querySelectorAll('summary');

      // JSDOM doesn't handle real focus layout well, so we spy on the method
      const focusSpy = vi.spyOn(summaries[1], 'focus');

      // Trigger Keydown on first item
      const event = new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true});
      summaries[0].dispatchEvent(event);

      fixture.detectChanges();
      expect(focusSpy).toHaveBeenCalled();
    });
  });
});
