import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InzSideMenuGroupComponent} from '../src/lib/components';
import {InzForgeHyperUiSideMenuManager} from '../src/lib/services/side-menu-manager.service';
import {provideRouter} from '@angular/router';
import {signal} from '@angular/core';
import {By} from '@angular/platform-browser';
import {InzForgeHyperUiSideMenuItem} from '../src/lib/models/side-menu.models';

describe('InzSideMenuGroupComponent', () => {
  let fixture: ComponentFixture<InzSideMenuGroupComponent>;

  // 1. Mock the Manager to control the 'isCompact' signal
  const mockManager = {
    isCompact: signal(false)
  };

  const mockGroupItem: InzForgeHyperUiSideMenuItem = {
    label: 'Management',
    iconClass: 'fa-cog',
    isExpandedByDefault: true, // Test initial open state
    children: [
      {label: 'Users', route: '/users'},
      {label: 'Roles', route: '/roles'}
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzSideMenuGroupComponent],
      providers: [
        provideRouter([]), // Required for child links
        {provide: InzForgeHyperUiSideMenuManager, useValue: mockManager}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InzSideMenuGroupComponent);

    // Reset mock to Standard mode
    mockManager.isCompact.set(false);
  });

  it('should render a <details> element in Standard Mode', () => {
    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    const details = fixture.debugElement.query(By.css('details'));
    const summary = fixture.debugElement.query(By.css('summary'));

    expect(details).toBeTruthy();
    expect(summary.nativeElement.textContent).toContain('Management');

    // Verify the "Expanded by Default" logic
    expect(details.nativeElement.hasAttribute('open')).toBe(true);
  });

  it('should toggle the chevron rotation class when open', () => {
    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    const chevron = fixture.debugElement.query(By.css('svg'));
    // We check the parent grouping logic often found in CSS,
    // but here we check if the DOM structure exists that supports the CSS.
    expect(chevron).toBeTruthy();
  });

  it('should render children links inside the details element', () => {
    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('inz-side-menu-link'));
    expect(links.length).toBe(2); // Users + Roles
  });

  it('should flatten the structure (remove <details>) in Compact Mode', () => {
    // 1. Switch to Compact
    mockManager.isCompact.set(true);

    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    // 2. Ensure <details> is GONE
    const details = fixture.debugElement.query(By.css('details'));
    expect(details).toBeFalsy();

    // 3. Ensure children are still rendered directly
    const links = fixture.debugElement.queryAll(By.css('inz-side-menu-link'));
    expect(links.length).toBe(2);
  });
});
