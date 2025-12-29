# Shared Theme Syntax Reference

In Tailwind 4, defining variables within the `@theme` block automatically generates utilities for every property that supports that scale. Below is the full registry of `inz-` prefixed utility classes available in your templates.

### 1. Colors (`bg-*`, `text-*`, `border-*`, `ring-*`, `accent-*`)

These can be used with any color-related property.

* `*-inz-primary` / `*-inz-primary-foreground`
* `*-inz-secondary` / `*-inz-secondary-foreground`
* `*-inz-accent` / `*-inz-accent-foreground`
* `*-inz-destructive` / `*-inz-destructive-foreground`
* `*-inz-muted` / `*-inz-muted-foreground`
* `*-inz-background`
* `*-inz-foreground`
* `*-inz-border`
* `*-inz-input`
* `*-inz-ring`

### 2. Spacing (`p-*`, `m-*`, `gap-*`, `w-*`, `h-*`, `inset-*`, `space-*`)

The numeric suffix corresponds to the spacing scale defined in your theme.

* `*-inz-0` (0rem)
* `*-inz-1` (0.25rem / 4px)
* `*-inz-2` (0.5rem / 8px)
* `*-inz-3` (0.75rem / 12px)
* `*-inz-4` (1rem / 16px)
* `*-inz-5` (1.25rem / 20px)
* `*-inz-6` (1.5rem / 24px)
* `*-inz-8` (2rem / 32px)
* `*-inz-10` (2.5rem / 40px)
* `*-inz-12` (3rem / 48px)
* `*-inz-16` (4rem / 64px)
* `*-inz-20` (5rem / 80px)

### 3. Typography (`text-*`)

Controls the `font-size`.

* `text-inz-xs`
* `text-inz-sm`
* `text-inz-base`
* `text-inz-lg`
* `text-inz-xl`
* `text-inz-2xl`
* `text-inz-3xl`
* `text-inz-4xl`
* `text-inz-5xl`

### 4. Line Height (`leading-*`)

* `leading-inz-tight`
* `leading-inz-snug`
* `leading-inz-normal`
* `leading-inz-relaxed`

### 5. Border Radius (`rounded-*`)

* `rounded-inz-sm`
* `rounded-inz-md`
* `rounded-inz-lg`
* `rounded-inz-xl`

### 6. Shadows (`shadow-*`)

* `shadow-inz-sm`
* `shadow-inz` (default)
* `shadow-inz-md`
* `shadow-inz-lg`
* `shadow-inz-xl`

### 7. Z-Index (`z-*`)

* `z-inz-dropdown` (1000)
* `z-inz-sticky` (1100)
* `z-inz-fixed` (1200)
* `z-inz-modal` (1300)
* `z-inz-popover` (1400)
* `z-inz-tooltip` (1500)

### 8. Animations (`animate-*`)

* `animate-inz-accordion-down`
* `animate-inz-accordion-up`
* `animate-inz-in`
* `animate-inz-out`

### 9. Transitions (`duration-*`, `ease-*`)

* `duration-inz-fast` (150ms)
* `duration-inz-normal` (250ms)
* `duration-inz-slow` (350ms)
* `ease-inz-fast`

---

### Usage Example

```html

<button class="
  bg-inz-primary 
  text-inz-primary-foreground 
  px-inz-4 
  py-inz-2 
  rounded-inz-md 
  shadow-inz-sm 
  hover:bg-inz-primary/90 
  transition-colors 
  duration-inz-fast
">
  Blueprint Button
</button>
```

**Brief Technical Note:** Tailwind 4 dynamically creates these classes by parsing the `@theme` block. You do not need to register these in a `tailwind.config.js`. If you add a new variable like `--color-inz-brand: #000`, the class `bg-inz-brand` becomes available instantly.
