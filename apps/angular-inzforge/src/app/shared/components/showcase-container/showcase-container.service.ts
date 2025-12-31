import {effect, inject, Injectable, PLATFORM_ID, signal} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class InzForgeAppShowcaseContainerService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly KEY_DARK_MODE = 'inz-showcase-dark-mode';
  private readonly KEY_RTL = 'inz-showcase-rtl';

  private _isRtlDirection = signal(this.readFromStorage(this.KEY_RTL));
  readonly isRtlDirection = this._isRtlDirection.asReadonly();

  private _isDarkModeOn = signal(this.readFromStorage(this.KEY_DARK_MODE));
  readonly isDarkModeOn = this._isDarkModeOn.asReadonly();

  constructor() {
    // Use effects to auto-save whenever signals change
    effect(() => {
      this.writeToStorage(this.KEY_DARK_MODE, this._isDarkModeOn());
    });

    effect(() => {
      this.writeToStorage(this.KEY_RTL, this._isRtlDirection());
    });
  }

  toggleDarkMode() {
    this._isDarkModeOn.update(value => !value);
  }

  toggleDirection() {
    this._isRtlDirection.update(v => !v);
  }

  private readFromStorage(key: string): boolean {
    if (isPlatformBrowser(this.platformId)) return localStorage.getItem(key) === 'true';
    return false;
  }

  private writeToStorage(key: string, value: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(key, String(value));
  }
}
