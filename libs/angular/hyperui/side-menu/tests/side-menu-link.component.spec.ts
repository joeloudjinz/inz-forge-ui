import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InzSideMenuLinkComponent } from '../src/lib/components';
import { InzForgeHyperUiSideMenuManager } from '../src/lib/services/side-menu-manager.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InzSideMenuLinkComponent', () => {
  let fixture: ComponentFixture<InzSideMenuLinkComponent>;

  const mockManager = {
    isCompact: signal(false)
  };

  const testItem = {
    label: 'Test Link',
    route: '/test',
    iconClass: 'icon-test'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzSideMenuLinkComponent],
      providers: [
        provideRouter([]),
        { provide: InzForgeHyperUiSideMenuManager, useValue: mockManager }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InzSideMenuLinkComponent);
    mockManager.isCompact.set(false);
  });

  it('should render label text in standard mode', () => {
    fixture.componentRef.setInput('item', testItem);
    fixture.detectChanges();

    const linkText = fixture.debugElement.query(By.css('span.font-medium'));
    expect(linkText.nativeElement.textContent).toContain('Test Link');

    const tooltip = fixture.debugElement.query(By.css('.invisible.absolute'));
    expect(tooltip).toBeFalsy();
  });

  it('should render iconHtml when provided', () => {
    // Use safe HTML (like <b>) to avoid Angular Sanitizer warnings in test logs.
    const safeHtml = '<b class="custom-icon">Icon</b>';
    const htmlItem = { ...testItem, iconHtml: safeHtml, iconClass: undefined };

    fixture.componentRef.setInput('item', htmlItem);
    fixture.detectChanges();

    // [innerHTML] is a property, not an attribute.
    // Target the class 'shrink-0' which 'iconClasses()' applies to this span.
    const iconSpan = fixture.debugElement.query(By.css('span.shrink-0'));

    expect(iconSpan).toBeTruthy();
    expect(iconSpan.nativeElement.innerHTML).toContain('custom-icon');
  });

  it('should render tooltip structure in compact mode', () => {
    mockManager.isCompact.set(true);
    fixture.componentRef.setInput('item', testItem);
    fixture.detectChanges();

    const tooltip = fixture.debugElement.query(By.css('.invisible.absolute'));
    expect(tooltip).toBeTruthy();
    expect(tooltip.nativeElement.textContent).toContain('Test Link');
  });

  it('should apply active-link class', () => {
    fixture.componentRef.setInput('item', testItem);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.attributes['routerLinkActive']).toBe('active-link');
  });
});
