import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InzSideMenuProfileComponent} from '../src/lib/components';
import {InzForgeHyperUiSideMenuManager} from '../src/lib/services/side-menu-manager.service';
import {provideRouter} from '@angular/router';
import {signal} from '@angular/core';
import {By} from '@angular/platform-browser';
import {InzForgeHyperUiSideMenuProfile} from '../src/lib/models/side-menu.models';

describe('InzSideMenuProfileComponent', () => {
  let fixture: ComponentFixture<InzSideMenuProfileComponent>;

  const mockManager = {
    isCompact: signal(false)
  };

  const mockProfile: InzForgeHyperUiSideMenuProfile = {
    headline: 'Jane Doe',
    subtitle: 'Admin',
    avatarUrl: 'assets/jane.jpg',
    profileRoute: '/profile'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InzSideMenuProfileComponent],
      providers: [
        provideRouter([]),
        {provide: InzForgeHyperUiSideMenuManager, useValue: mockManager}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InzSideMenuProfileComponent);

    mockManager.isCompact.set(false);
  });

  it('should render avatar and text in Standard Mode', () => {
    fixture.componentRef.setInput('profile', mockProfile);
    fixture.detectChanges();

    // Check Image
    const img = fixture.debugElement.query(By.css('img'));

    // [ngSrc] is processed by the directive into a standard 'src' attribute.
    // Verify 'src' exists and contains our image path.
    expect(img.attributes['src']).toContain('assets/jane.jpg');
    expect(img.attributes['alt']).toBe('Jane Doe');

    // Check Text
    const headline = fixture.debugElement.query(By.css('strong.side-menu-text-main'));
    const subtitle = fixture.debugElement.query(By.css('span.side-menu-text-sub'));

    expect(headline.nativeElement.textContent).toContain('Jane Doe');
    expect(subtitle.nativeElement.textContent).toContain('Admin');
  });

  it('should hide text elements in Compact Mode', () => {
    mockManager.isCompact.set(true);
    fixture.componentRef.setInput('profile', mockProfile);
    fixture.detectChanges();

    // Text should be removed from DOM entirely via @if
    const headline = fixture.debugElement.query(By.css('strong.side-menu-text-main'));
    expect(headline).toBeFalsy();

    // Image should still be there
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('should adjust styling classes based on mode', () => {
    // Standard Mode Check
    fixture.componentRef.setInput('profile', mockProfile);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a'));
    expect(link.classes['p-4']).toBe(true);
    expect(link.classes['justify-center']).toBeFalsy();

    // Compact Mode Check
    mockManager.isCompact.set(true);
    fixture.detectChanges();

    expect(link.classes['p-4']).toBeFalsy();
    expect(link.classes['justify-center']).toBe(true);
  });
});
