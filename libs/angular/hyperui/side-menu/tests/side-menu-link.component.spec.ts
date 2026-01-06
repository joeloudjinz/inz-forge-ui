import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InzSideMenuLinkComponent } from '../src/lib/components';
import { InzForgeHyperUiSideMenuManager } from '../src/lib/services/side-menu-manager.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InzSideMenuLinkComponent', () => {
  let fixture: ComponentFixture<InzSideMenuLinkComponent>;

  // Mock Manager to control 'isCompact' signal manually
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
        // Override the service with our mock
        { provide: InzForgeHyperUiSideMenuManager, useValue: mockManager }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InzSideMenuLinkComponent);

    // Reset mock signal
    mockManager.isCompact.set(false);
  });

  it('should render label text in standard mode', () => {
    fixture.componentRef.setInput('item', testItem);
    fixture.detectChanges();

    const linkText = fixture.debugElement.query(By.css('span.font-medium'));
    expect(linkText.nativeElement.textContent).toContain('Test Link');

    // Ensure tooltip is NOT visible/rendered in standard logic
    const tooltip = fixture.debugElement.query(By.css('.invisible.absolute'));
    expect(tooltip).toBeFalsy();
  });

  it('should render tooltip structure in compact mode', () => {
    // Switch mock to compact
    mockManager.isCompact.set(true);

    fixture.componentRef.setInput('item', testItem);
    fixture.detectChanges();

    // In compact mode, the text is hidden inside a tooltip-like span
    const tooltip = fixture.debugElement.query(By.css('.invisible.absolute'));
    expect(tooltip).toBeTruthy();
    expect(tooltip.nativeElement.textContent).toContain('Test Link');
  });

  it('should apply active-link class', () => {
    fixture.componentRef.setInput('item', testItem);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    // We check if routerLinkActive binding exists (Angular handles the class application based on URL)
    // Since we are not navigating, we just check the attribute is present
    expect(anchor.attributes['routerLinkActive']).toBe('active-link');
  });
});
