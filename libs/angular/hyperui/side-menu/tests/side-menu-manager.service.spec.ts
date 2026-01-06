import {TestBed} from '@angular/core/testing';
import {InzForgeHyperUiSideMenuManager} from '../src/lib/services/side-menu-manager.service';
import {InzForgeHyperUiSideMenuModes} from '../src/lib/models/side-menu-modes.enum';
import {InzForgeHyperUiSideMenuItem} from '../src/lib/models/side-menu.models';

describe('InzForgeHyperUiSideMenuManager', () => {
  let service: InzForgeHyperUiSideMenuManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InzForgeHyperUiSideMenuManager],
    });
    service = TestBed.inject(InzForgeHyperUiSideMenuManager);
  });

  it('should initialize with default standard mode', () => {
    expect(service.mode()).toBe(InzForgeHyperUiSideMenuModes.standard);
    expect(service.isCompact()).toBe(false);
  });

  it('should update state via update() method', () => {
    const mockItems: InzForgeHyperUiSideMenuItem[] = [{label: 'Dashboard'}];

    service.update({
      mode: InzForgeHyperUiSideMenuModes.compact,
      items: mockItems
    });

    expect(service.mode()).toBe(InzForgeHyperUiSideMenuModes.compact);
    expect(service.items()).toEqual(mockItems);
    expect(service.isCompact()).toBe(true);
  });

  it('should partial update without resetting other values', () => {
    service.update({mode: InzForgeHyperUiSideMenuModes.compact});
    expect(service.isCompact()).toBe(true);

    // Update only items (mode should stay compact)
    const mockItems: InzForgeHyperUiSideMenuItem[] = [{label: 'Settings'}];
    service.update({items: mockItems});

    expect(service.items()).toEqual(mockItems);
    expect(service.isCompact()).toBe(true); // Should still be compact
  });
});
