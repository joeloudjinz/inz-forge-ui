import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InzForgeHyperUiSideMenuComponent} from '../src/lib/side-menu.component';
import {InzSideMenuLinkComponent, InzSideMenuProfileComponent} from '../src/lib/components';
import {InzForgeHyperUiSideMenuModes} from '../src/lib/models/side-menu-modes.enum';
import {provideRouter} from '@angular/router';
import {By} from '@angular/platform-browser';
import {InzForgeHyperUiSideMenuItem} from '../src/lib/models/side-menu.models';

describe('InzForgeHyperUiSideMenuComponent', () => {
  let fixture: ComponentFixture<InzForgeHyperUiSideMenuComponent>;

  const mockItems: InzForgeHyperUiSideMenuItem[] = [
    {label: 'Home', route: '/home', iconClass: 'fa-home'},
    {label: 'Settings', route: '/settings'}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzForgeHyperUiSideMenuComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(InzForgeHyperUiSideMenuComponent);
  });

  it('should render the menu with items (Integration Check)', async () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    await fixture.whenStable();

    // Use By.directive to find the actual Child Components, not just CSS selectors
    const links = fixture.debugElement.queryAll(By.directive(InzSideMenuLinkComponent));
    expect(links.length).toBe(2);
  });

  it('should render logo when provided', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('logo', {text: 'My App', subtitle: 'v1.0'});
    fixture.detectChanges();

    const logoHeader = fixture.debugElement.query(By.css('h1'));
    const logoSub = fixture.debugElement.query(By.css('.side-menu-text-sub'));

    expect(logoHeader.nativeElement.textContent).toContain('My App');
    expect(logoSub.nativeElement.textContent).toContain('v1.0');
  });

  it('should render footer items when provided', () => {
    fixture.componentRef.setInput('items', []); // No main items
    fixture.componentRef.setInput('footerItems', [
      {label: 'Logout', route: '/logout'}
    ]);
    fixture.detectChanges();

    // Look specifically in the footer area
    const footerContainer = fixture.debugElement.query(By.css('.mt-auto'));
    const footerLinks = footerContainer.queryAll(By.directive(InzSideMenuLinkComponent));

    expect(footerLinks.length).toBe(1);
    expect(footerLinks[0].componentInstance.item().label).toBe('Logout');
  });

  it('should switch to compact mode classes', async () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.componentRef.setInput('mode', InzForgeHyperUiSideMenuModes.standard);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.side-menu-root'));
    expect(container.classes['w-64']).toBe(true);

    // Switch to Compact
    fixture.componentRef.setInput('mode', InzForgeHyperUiSideMenuModes.compact);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(container.classes['w-16']).toBe(true);
  });

  it('should render profile section when profile input is provided', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('profile', {
      headline: 'John Doe',
      avatarUrl: 'assets/avatar.jpg'
    });
    fixture.detectChanges();

    const profileCmp = fixture.debugElement.query(By.directive(InzSideMenuProfileComponent));
    expect(profileCmp).toBeTruthy();
  });
});
