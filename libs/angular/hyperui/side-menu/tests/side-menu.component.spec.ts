import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InzForgeHyperUiSideMenuComponent } from '../src/lib/side-menu.component';
import { InzForgeHyperUiSideMenuModes } from '../src/lib/models/side-menu-modes.enum';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { InzForgeHyperUiSideMenuItem } from '../src/lib/models/side-menu.models';

describe('InzForgeHyperUiSideMenuComponent', () => {
  let fixture: ComponentFixture<InzForgeHyperUiSideMenuComponent>;

  const mockItems: InzForgeHyperUiSideMenuItem[] = [
    { label: 'Home', route: '/home', iconClass: 'fa-home' },
    { label: 'Settings', route: '/settings' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzForgeHyperUiSideMenuComponent],
      providers: [
        provideRouter([]) // Required because child components use RouterLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InzForgeHyperUiSideMenuComponent);
  });

  it('should render the menu with items', async () => {
    // 1. Set Signal Input
    fixture.componentRef.setInput('items', mockItems);

    // 2. Trigger Change Detection (runs the effect() in constructor)
    fixture.detectChanges();
    await fixture.whenStable();

    // 3. Assert DOM
    const links = fixture.debugElement.queryAll(By.css('inz-side-menu-link'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.textContent).toContain('Home');
  });

  it('should switch to compact mode classes when mode input changes', async () => {
    // 1. Initialize in Standard Mode
    fixture.componentRef.setInput('items', mockItems);
    fixture.componentRef.setInput('mode', InzForgeHyperUiSideMenuModes.standard);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.side-menu-root'));
    expect(container.classes['w-64']).toBe(true);
    expect(container.classes['w-16']).toBeFalsy();

    // 2. Switch to Compact Mode
    fixture.componentRef.setInput('mode', InzForgeHyperUiSideMenuModes.compact);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(container.classes['w-16']).toBe(true);
    expect(container.classes['w-64']).toBeFalsy();
  });

  it('should render profile section when profile input is provided', async () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('profile', {
      headline: 'John Doe',
      avatarUrl: 'assets/avatar.jpg'
    });

    fixture.detectChanges();

    const profileCmp = fixture.debugElement.query(By.css('inz-side-menu-profile'));
    expect(profileCmp).toBeTruthy();
  });
});
