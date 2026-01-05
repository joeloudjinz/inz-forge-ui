import {computed, Injectable, signal} from "@angular/core";
import {
  InzForgeHyperUiSideMenuItem,
  InzForgeHyperUiSideMenuLogo,
  InzForgeHyperUiSideMenuProfile
} from "../models/side-menu.models";
import {InzForgeHyperUiSideMenuModes} from "../models/side-menu-modes.enum";
import {InzForgeHyperUiSideMenuConfig} from "../models/inz-forge-hyper-ui-side-menu.config";

@Injectable()
export class InzForgeHyperUiSideMenuManager {
  readonly isCompact = computed(() => this.mode() === InzForgeHyperUiSideMenuModes.compact);
  private readonly _items = signal<InzForgeHyperUiSideMenuItem[]>([]);
  readonly items = this._items.asReadonly();
  private readonly _mode = signal<InzForgeHyperUiSideMenuModes>(InzForgeHyperUiSideMenuModes.standard);
  readonly mode = this._mode.asReadonly();
  private readonly _logo = signal<InzForgeHyperUiSideMenuLogo | undefined>(undefined);
  readonly logo = this._logo.asReadonly();
  private readonly _profile = signal<InzForgeHyperUiSideMenuProfile | undefined>(undefined);
  readonly profile = this._profile.asReadonly();
  private readonly _footerItems = signal<InzForgeHyperUiSideMenuItem[]>([]);
  readonly footerItems = this._footerItems.asReadonly();

  update(data: Partial<InzForgeHyperUiSideMenuConfig>) {
    if (data.mode) this._mode.set(data.mode);
    if (data.items) this._items.set(data.items);
    if (data.logo !== undefined) this._logo.set(data.logo);
    if (data.profile !== undefined) this._profile.set(data.profile);
    if (data.footerItems) this._footerItems.set(data.footerItems);
  }
}
