# InzForge HyperUI Accordion

An Angular implementation of the HyperUI accordion component with multiple styles and configurations.

## Features

- Multiple accordion modes: Simple, Divided, Compact
- Dark mode support
- RTL (Right-to-Left) support
- Keyboard navigation
- Accessibility support (ARIA attributes)
- Support for icons in accordion items
- OnPush change detection strategy
- ViewEncapsulation.Emulated

## Installation

This component follows the "source-first" blueprint approach. Copy the source files directly into your project.

## Usage

```typescript
import { InzForgeHyperUiAccordionComponent, InzForgeHyperUiAccordionModes } from '@inz-forge-ui/accordion';

// Example data
const accordionItems = [
  {
    title: 'What are the basic features?',
    description: 'Lorem ipsum dolor sit amet...',
    isExpandedByDefault: false,
    iconClass: 'fas fa-star' // Optional icon
  },
  {
    title: 'How do I get started?',
    description: 'Lorem ipsum dolor sit amet...',
    isExpandedByDefault: false
  }
];
```

```html
<inz-hyperui-accordion 
  [items]="accordionItems"
  [mode]="InzForgeHyperUiAccordionModes.simple"
  [isDark]="false"
  [isRTL]="false">
</inz-hyperui-accordion>
```

## API

### Inputs

- `items`: Array of accordion items with title, description, and optional properties
- `mode`: Accordion mode (simple, divided, compact)
- `isDark`: Enable dark mode styling
- `isRTL`: Enable RTL layout

### Accordion Item Model

```typescript
interface InzForgeHyperUiAccordionItemModel {
  title: string;
  description: string;
  isExpandedByDefault?: boolean;
  iconClass?: string;
  iconComponent?: string; // For custom icon components
}
```

### Modes

- `InzForgeHyperUiAccordionModes.simple` - Default accordion style
- `InzForgeHyperUiAccordionModes.divided` - Divided accordion style
- `InzForgeHyperUiAccordionModes.compact` - Compact accordion style

## Styling

The component uses Tailwind CSS classes with `@apply` directives for consistent styling. Make sure you have Tailwind CSS configured in your project.

## Accessibility

The component includes proper ARIA attributes and keyboard navigation support:
- Arrow keys to navigate between items
- Enter/Space to toggle accordion items
- Home/End to jump to first/last item
