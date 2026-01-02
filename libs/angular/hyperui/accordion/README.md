# InzForge HyperUI Accordion

An Angular implementation of the HyperUI accordion component with multiple styles and configurations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Different Modes](#different-modes)
  - [Exclusive Mode](#exclusive-mode)
  - [Icons Support](#icons-support)
  - [Default Expanded Items](#default-expanded-items)
- [API](#api)
  - [Inputs](#inputs)
  - [Accordion Item Model](#accordion-item-model)
  - [Modes](#modes)
- [Styling](#styling)
- [Dark Mode](#dark-mode)
- [Accessibility](#accessibility)
- [Examples](#examples)

## Features

- Multiple accordion modes: Simple, Divided, Compact
- Dark mode support
- RTL (Right-to-Left) support
- Keyboard navigation
- Accessibility support (ARIA attributes)
- Support for icons in accordion items
- Exclusive mode (only one item open at a time)
- OnPush change detection strategy
- ViewEncapsulation.Emulated

## Installation

This component follows the "source-first" blueprint approach. Copy the source files directly into your project.

## Usage

### Basic Usage

```typescript
import {InzForgeHyperUiAccordionComponent, InzForgeHyperUiAccordionModes} from '@inz-forge-ui/accordion';

// Example data
const accordionItems = [
  {
    title: 'What are the basic features?',
    description: 'Lorem ipsum dolor sit amet...'
  },
  {
    title: 'How do I get started?',
    description: 'Lorem ipsum dolor sit amet...'
  }
];
```

```html

<inz-hyperui-accordion
  [items]="accordionItems"
  [mode]="InzForgeHyperUiAccordionModes.simple">
</inz-hyperui-accordion>
```

### Different Modes

The accordion supports three different visual modes:

#### Simple Mode (Default)

```html

<inz-hyperui-accordion
  [items]="accordionItems"
  [mode]="InzForgeHyperUiAccordionModes.simple">
</inz-hyperui-accordion>
```

#### Divided Mode

```html

<inz-hyperui-accordion
  [items]="accordionItems"
  [mode]="InzForgeHyperUiAccordionModes.divided">
</inz-hyperui-accordion>
```

#### Compact Mode

```html

<inz-hyperui-accordion
  [items]="accordionItems"
  [mode]="InzForgeHyperUiAccordionModes.compact">
</inz-hyperui-accordion>
```

### Exclusive Mode

To ensure only one accordion item is open at a time, use the `exclusive` input:

```html

<inz-hyperui-accordion
  [items]="accordionItems"
  [mode]="InzForgeHyperUiAccordionModes.simple"
  [exclusive]="true">
</inz-hyperui-accordion>
```

### Icons Support

You can add icons to accordion items using the `iconClass` property:

```typescript
const accordionItems = [
  {
    title: 'Featured Item',
    description: 'This item has an icon',
    iconClass: 'fas fa-star' // Font Awesome icon class
  },
  {
    title: 'Another Item',
    description: 'This item has a different icon',
    iconClass: 'fas fa-info-circle'
  }
];
```

Or use custom icon components:

```typescript
const accordionItems = [
  {
    title: 'Custom Icon',
    description: 'This item has a custom SVG icon',
    iconComponent: '<svg>...</svg>' // Raw SVG string
  }
];
```

### Default Expanded Items

To have an accordion item expanded by default, set `isExpandedByDefault` to `true`:

```typescript
const accordionItems = [
  {
    title: 'Frequently Asked',
    description: 'This item is expanded by default',
    isExpandedByDefault: true
  },
  {
    title: 'Another Question',
    description: 'This item is collapsed by default'
  }
];
```

## API

### Inputs

| Input       | Type                                  | Default                                | Description                                                               |
|-------------|---------------------------------------|----------------------------------------|---------------------------------------------------------------------------|
| `items`     | `InzForgeHyperUiAccordionItemModel[]` | -                                      | Array of accordion items with title, description, and optional properties |
| `mode`      | `InzForgeHyperUiAccordionModes`       | `InzForgeHyperUiAccordionModes.simple` | Accordion mode (simple, divided, compact)                                 |
| `exclusive` | `boolean`                             | `false`                                | When true, only one item can be open at a time                            |

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

- `InzForgeHyperUiAccordionModes.simple` - Default accordion style with borders and padding
- `InzForgeHyperUiAccordionModes.divided` - Accordion items separated by horizontal lines
- `InzForgeHyperUiAccordionModes.compact` - More compact version with smaller padding

## Styling

The component uses Tailwind CSS classes with CSS variables for consistent styling. The component supports both light and dark modes:

```css
/* Define CSS variables for light and dark mode */
:host {
  /* Default (light mode) values */
  --accordion-bg: #ffffff;
  --accordion-text: #2d3748;
  --accordion-border: #e2e8f0;
  --accordion-hover-bg: #f7fafc;
  --accordion-divide-color: #e2e8f0;
  --accordion-summary-text: #1a202c;
  --accordion-summary-hover-text: #4a5568;
  --accordion-content-text: #4a5568;
}

/* Dark mode values when .dark class is present on host */
:host(.dark) {
  --accordion-bg: #1a202c;
  --accordion-text: #e2e8f0;
  --accordion-border: #4a5568;
  --accordion-hover-bg: #2d3748;
  --accordion-divide-color: #4a5568;
  --accordion-summary-text: #e2e8f0;
  --accordion-summary-hover-text: #cbd5e0;
  --accordion-content-text: #cbd5e0;
}
```

## Dark Mode

To enable dark mode for the accordion component, you'll have to apply `dark` class to the component tag:

```typescript
// Example using a theme service
@Component({
  selector: 'app-example',
  template: `
    <inz-hyperui-accordion [items]="accordionItems" [class.dark]="isDarkMode"></inz-hyperui-accordion>
  `
})
export class ExampleComponent {
  isDarkMode = true; // or false to disable dark mode
}
```

## Accessibility

The component includes proper ARIA attributes and keyboard navigation support:

- Uses native HTML `<details>` and `<summary>` elements for semantic structure
- Arrow keys to navigate between items
- Enter/Space to toggle accordion items (handled natively by browser)
- Home/End to jump to first/last item
- Focus management with visible focus indicators
- Proper contrast ratios for accessibility

## Examples

### Complete Example with All Features

```typescript
import {Component} from '@angular/core';
import {InzForgeHyperUiAccordionComponent, InzForgeHyperUiAccordionModes, InzForgeHyperUiAccordionItemModel} from '@inz-forge-ui/accordion';

@Component({
  selector: 'app-example',
  template: `
    <inz-hyperui-accordion
      [items]="accordionItems"
      [mode]="currentMode"
      [exclusive]="true">
    </inz-hyperui-accordion>
  `,
  standalone: true,
  imports: [InzForgeHyperUiAccordionComponent]
})
export class ExampleComponent {
  currentMode = InzForgeHyperUiAccordionModes.simple;

  accordionItems: InzForgeHyperUiAccordionItemModel[] = [
    {
      title: 'Getting Started',
      description: 'Learn how to get started with our platform',
      isExpandedByDefault: true,
      iconClass: 'fas fa-rocket'
    },
    {
      title: 'Advanced Features',
      description: 'Discover advanced features and capabilities',
      iconClass: 'fas fa-cog'
    },
    {
      title: 'Support',
      description: 'Get help and support for your questions',
      iconClass: 'fas fa-headset'
    }
  ];
}
```
