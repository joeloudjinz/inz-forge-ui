To align with **"Source-First" Blueprint** philosophy and **Portability Protocol**, the `theme.css` file should act as the single source of truth for design tokens. In Tailwind v4, this is achieved by moving away from JS-based configs to CSS-native `@theme` blocks.

### 1. Define the Shared Theme

Update `libs/shared/utils/src/lib/theme.css` to use the v4 `@theme` block. This maps your `inz` tokens to the Tailwind engine.

```css
/* libs/shared/utils/src/lib/theme.css */
@theme {
  /* Mapping Tailwind classes (e.g., text-inz-primary) to CSS Variables */
  --color-inz-primary: var(--inz-primary, #3b82f6);
  --color-inz-secondary: var(--inz-secondary, #1e293b);

  --radius-inz-md: var(--inz-radius, 0.5rem);

  /* Shared Animations */
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;

  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }
  @keyframes accordion-up {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
}
```

---

### 2. Global Application Integration

In your showcase app, you must **import** the theme to make the variables available globally and define the actual values for the CSS variables.

Update `apps/angular-inzforge/src/styles.css`:

```css
@import "tailwindcss";

@plugin "tailwindcss-animate";

/* Import the theme tokens */
@import "../../../libs/shared/utils/src/lib/theme.css";

@layer base {
  :root {
    /* The actual source values for your tokens */
    --inz-primary: #3b82f6;
    --inz-secondary: #1e293b;
    --inz-radius: 0.5rem;
  }

  .dark {
    --inz-primary: #60a5fa;
    --inz-secondary: #f8fafc;
  }
}
```

---

### 3. Component-Level Usage (The Portability Protocol)

To use these tokens inside an isolated component while maintaining **Shadow DOM/Emulated Encapsulation**, use the `@reference` directive. This allows the component to use the tokens without duplicating the CSS in the final bundle.

Update `libs/angular/hyperui/accordion/src/accordion.component.css`:

```css
/* Reference core Tailwind and the Shared Theme */
@reference "tailwindcss";
@reference "../../../../shared/utils/src/lib/theme.css";

.inz-accordion-container {
  /* Using the token via @apply */
  @apply border border-inz-secondary/20 rounded-inz-md;
}

.inz-accordion-trigger {
  /* Using the token via CSS variable */
  color: var(--color-inz-primary);
  @apply flex items-center justify-between w-full p-4;
}
```

---

### Implementation Steps

1. **Migrate:** Move all tokens from `tailwind.config.base.js` into the `@theme` block in `libs/shared/utils/src/lib/theme.css`.
2. **App Import:** Use `@import` in the application `styles.css`.
3. **Lib Reference:** Use `@reference` in all component `.css` files.

### Brief Technical Note

By using `@reference` for the theme file, you satisfy the **Portability Protocol**: the component "knows" about the design system during development/compilation, but it doesn't hardcode the values. This allows an end-user to override `--inz-primary` in their own `:root` and have your component automatically respond to their theme.
