import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InzSideMenuGroupComponent, InzSideMenuLinkComponent} from '../src/lib/components';
import {InzForgeHyperUiSideMenuManager} from '../src/lib/services/side-menu-manager.service';
import {provideRouter} from '@angular/router';
import {signal} from '@angular/core';
import {By} from '@angular/platform-browser';
import {InzForgeHyperUiSideMenuItem} from '../src/lib/models/side-menu.models';

describe('InzSideMenuGroupComponent', () => {
  let fixture: ComponentFixture<InzSideMenuGroupComponent>;

  const mockManager = {
    isCompact: signal(false)
  };

  const mockGroupItem: InzForgeHyperUiSideMenuItem = {
    label: 'Management',
    iconClass: 'fa-cog',
    isExpandedByDefault: true,
    children: [
      {label: 'Users', route: '/users'},
      {label: 'Roles', route: '/roles'}
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzSideMenuGroupComponent],
      providers: [
        provideRouter([]),
        {provide: InzForgeHyperUiSideMenuManager, useValue: mockManager}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InzSideMenuGroupComponent);
    mockManager.isCompact.set(false);
  });

  it('should render a <details> element in Standard Mode', () => {
    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    const details = fixture.debugElement.query(By.css('details'));
    const summary = fixture.debugElement.query(By.css('summary'));

    expect(details).toBeTruthy();
    expect(summary.nativeElement.textContent).toContain('Management');
    expect(details.nativeElement.hasAttribute('open')).toBe(true);
  });

  it('should render children links inside the details element', () => {
    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    // Ensure we are finding the actual component directives
    const links = fixture.debugElement.queryAll(By.directive(InzSideMenuLinkComponent));
    expect(links.length).toBe(2);
  });

  it('should flatten the structure (remove <details>) in Compact Mode', () => {
    mockManager.isCompact.set(true);
    fixture.componentRef.setInput('item', mockGroupItem);
    fixture.detectChanges();

    const details = fixture.debugElement.query(By.css('details'));
    expect(details).toBeFalsy();

    // Children should still exist
    const links = fixture.debugElement.queryAll(By.directive(InzSideMenuLinkComponent));
    expect(links.length).toBe(2);
  });
});
