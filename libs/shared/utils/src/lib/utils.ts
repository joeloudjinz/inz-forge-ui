import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes properly.
 * This utility function uses clsx to conditionally join class names and tailwind-merge
 * to intelligently merge Tailwind CSS classes, preventing conflicts.
 *
 * @param inputs - One or more class values (strings, objects with boolean values, arrays)
 * @returns A merged string of class names
 *
 * @example
 * cn('text-red-500', 'bg-blue-200', condition && 'font-bold')
 * // Returns: 'text-red-500 bg-blue-200 font-bold' (if condition is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe utility to get a CSS variable value
 * @param name - The CSS variable name without the -- prefix
 * @param fallback - Optional fallback value if the variable is not defined
 * @returns The CSS variable value as a string
 */
export function getCssVariable(name: string, fallback?: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
  return value.trim() || fallback || '';
}

/**
 * Utility to convert HSL color values to CSS-ready format
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns CSS-ready HSL string
 */
export function hslToCss(h: number, s: number, l: number): string {
  return `${h / 360}, ${s / 100}, ${l / 100}`;
}

/**
 * Utility to convert hex color to HSL
 * @param hex - Hex color string (e.g., #3b82f6)
 * @returns Object with h, s, l values
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h = Math.round(h * 60);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  }

  return { h, s, l };
}
