import {computed, Injectable, signal} from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Computed signal to check if dark mode is active
  readonly isDark = computed(() => this.currentTheme() === 'dark');
  private readonly DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';
  private readonly THEME_STORAGE_KEY = 'inz-theme-preference';
  // Signal to store the user's theme preference
  private readonly themePreference = signal<Theme>('system');
  // Signal to track if we're currently in dark mode
  private readonly isDarkMode = signal<boolean>(this.getInitialThemeState());
  // Computed signal that returns the current theme state
  readonly currentTheme = computed(() => {
    const preference = this.themePreference();
    if (preference === 'system') {
      return this.isDarkMode() ? 'dark' : 'light';
    }
    return preference;
  });
  /**
   * Set up a listener for system theme changes
   */
  private systemThemeListener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null = null;

  constructor() {
    this.initializeTheme();
  }

  /**
   * Set the theme preference
   * @param theme - The theme to set ('light', 'dark', or 'system')
   */
  setTheme(theme: Theme): void {
    this.themePreference.set(theme);

    // If switching to system theme, set up the listener
    if (theme === 'system') {
      this.setupSystemThemeListener();
    } else {
      // If switching away from system, remove the listener and set explicit theme
      this.removeSystemThemeListener();
      this.isDarkMode.set(theme === 'dark');
    }

    // Apply the theme to the document
    this.applyThemeToDocument();

    // Save the preference
    this.saveThemePreference(theme);
  }

  /**
   * Get the current theme preference
   */
  getThemePreference(): Theme {
    return this.themePreference();
  }

  /**
   * Toggle between light and dark themes (only when not in system mode)
   */
  toggleTheme(): void {
    const currentPreference = this.themePreference();

    if (currentPreference === 'system') {
      // If in system mode, switch to explicit opposite of current system state
      const newTheme = this.isDarkMode() ? 'light' : 'dark';
      this.setTheme(newTheme);
    } else {
      // If in explicit mode, toggle between light and dark
      const newTheme = currentPreference === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    }
  }

  /**
   * Clean up resources when the service is destroyed
   */
  ngOnDestroy(): void {
    this.removeSystemThemeListener();
  }

  /**
   * Initialize the theme by:
   * 1. Loading saved preference from localStorage
   * 2. Setting up system preference listener
   * 3. Applying the theme to the document
   */
  private initializeTheme(): void {
    // Load saved theme preference
    const savedTheme = this.loadThemePreference();
    this.themePreference.set(savedTheme);

    // Set up system preference listener if using system theme
    if (savedTheme === 'system') {
      this.setupSystemThemeListener();
    }

    // Apply the current theme to the document
    this.applyThemeToDocument();
  }

  /**
   * Apply the current theme to the document element
   */
  private applyThemeToDocument(): void {
    const isDark = this.currentTheme() === 'dark';

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private setupSystemThemeListener(): void {
    if (this.systemThemeListener) {
      this.removeSystemThemeListener();
    }

    const mediaQuery = window.matchMedia(this.DARK_MEDIA_QUERY);
    this.isDarkMode.set(mediaQuery.matches);

    this.systemThemeListener = (e: MediaQueryListEvent) => {
      this.isDarkMode.set(e.matches);
      this.applyThemeToDocument();
    };

    mediaQuery.addEventListener('change', this.systemThemeListener);
  }

  /**
   * Remove the system theme listener
   */
  private removeSystemThemeListener(): void {
    if (this.systemThemeListener) {
      const mediaQuery = window.matchMedia(this.DARK_MEDIA_QUERY);
      mediaQuery.removeEventListener('change', this.systemThemeListener);
      this.systemThemeListener = null;
    }
  }

  /**
   * Load theme preference from localStorage
   */
  private loadThemePreference(): Theme {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(this.THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    }
    return 'system'; // Default to system
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(theme: Theme): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    }
  }

  /**
   * Get the initial theme state based on system preference and saved settings
   */
  private getInitialThemeState(): boolean {
    if (typeof window !== 'undefined') {
      const savedTheme = this.loadThemePreference();

      if (savedTheme === 'system') {
        return window.matchMedia(this.DARK_MEDIA_QUERY).matches;
      }

      return savedTheme === 'dark';
    }

    return false; // Default to light mode if in SSR context
  }
}
