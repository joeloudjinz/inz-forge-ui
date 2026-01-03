# InzForge HyperUI Accordion

A Vue 3 implementation of the HyperUI accordion component with multiple styles and configurations.

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
  - [Props](#props)
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
- Vue 3 Composition API with `<script setup>`

## Installation

This component follows the "source-first" blueprint approach. Copy the source files directly into your project.

## Usage

### Basic Usage

```vue
<template>
  <InzForgeHyperUiAccordion :items="items" />
</template>

<script setup lang="ts">
import { InzForgeHyperUiAccordion, InzForgeHyperUiAccordionItemModel } from '@inz-forge-ui/vue/hyperui/accordion';

const items: InzForgeHyperUiAccordionItemModel[] = [
  {
    title: 'What are the basic features?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
  },
  {
    title: 'How do I get started?',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
  }
];
</script>
```

### Different Modes

```vue
<template>
  <!-- Simple mode (default) -->
  <InzForgeHyperUiAccordion :items="items" />

  <!-- Divided mode -->
  <InzForgeHyperUiAccordion :items="items" :mode="InzForgeHyperUiAccordionModes.divided" />

  <!-- Compact mode -->
  <InzForgeHyperUiAccordion :items="items" :mode="InzForgeHyperUiAccordionModes.compact" />
</template>

<script setup lang="ts">
import { InzForgeHyperUiAccordion, InzForgeHyperUiAccordionItemModel, InzForgeHyperUiAccordionModes } from '@inz-forge-ui/vue/hyperui/accordion';

const items: InzForgeHyperUiAccordionItemModel[] = [
  {
    title: 'Item 1',
    description: 'Description for item 1'
  },
  {
    title: 'Item 2',
    description: 'Description for item 2'
  }
];
</script>
```

### Exclusive Mode

```vue
<template>
  <!-- Only one item can be open at a time -->
  <InzForgeHyperUiAccordion :items="items" :exclusive="true" />
</template>

<script setup lang="ts">
import { InzForgeHyperUiAccordion, InzForgeHyperUiAccordionItemModel } from '@inz-forge-ui/vue/hyperui/accordion';

const items: InzForgeHyperUiAccordionItemModel[] = [
  {
    title: 'Question 1',
    description: 'Answer to question 1'
  },
  {
    title: 'Question 2',
    description: 'Answer to question 2'
  }
];
</script>
```

### Icons Support

```vue
<template>
  <InzForgeHyperUiAccordion :items="itemsWithIcons" />
</template>

<script setup lang="ts">
import { InzForgeHyperUiAccordion, InzForgeHyperUiAccordionItemModel } from '@inz-forge-ui/vue/hyperui/accordion';

const itemsWithIcons: InzForgeHyperUiAccordionItemModel[] = [
  {
    title: 'Settings',
    description: 'Configure your settings here',
    iconClass: 'fas fa-cog' // Using Font Awesome icon class
  },
  {
    title: 'Profile',
    description: 'Manage your profile',
    iconClass: 'fas fa-user'
  }
];
</script>
```

### Default Expanded Items

```vue
<template>
  <InzForgeHyperUiAccordion :items="items" />
</template>

<script setup lang="ts">
import { InzForgeHyperUiAccordion, InzForgeHyperUiAccordionItemModel } from '@inz-forge-ui/vue/hyperui/accordion';

const items: InzForgeHyperUiAccordionItemModel[] = [
  {
    title: 'Always Open',
    description: 'This item is open by default',
    isExpandedByDefault: true
  },
  {
    title: 'Closed by Default',
    description: 'This item is closed by default'
  }
];
</script>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `InzForgeHyperUiAccordionItemModel[]` | `[]` | Array of accordion items to display |
| `mode` | `InzForgeHyperUiAccordionModes` | `InzForgeHyperUiAccordionModes.simple` | Visual style of the accordion |
| `exclusive` | `boolean` | `false` | When true, only one item can be open at a time |

### Accordion Item Model

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | Yes | Title of the accordion item |
| `description` | `string` | Yes | Content of the accordion item |
| `isExpandedByDefault` | `boolean` | No | Whether the item should be expanded by default |
| `iconClass` | `string` | No | CSS class for an icon to display next to the title |
| `iconComponent` | `string` | No | HTML string for a custom icon component |

### Modes

- `InzForgeHyperUiAccordionModes.simple` - Standard accordion style
- `InzForgeHyperUiAccordionModes.divided` - Items with dividing lines
- `InzForgeHyperUiAccordionModes.compact` - Compact style with smaller padding

## Styling

The accordion uses Tailwind CSS classes for styling. You can customize the appearance by modifying the CSS variables defined in the component's scoped styles.

## Dark Mode

The component supports dark mode through CSS variables. Add the `dark` class to a parent element to enable dark mode styling.

## Accessibility

- Keyboard navigation support (Arrow keys, Home, End)
- Proper ARIA attributes
- Focus management
- Semantic HTML using `<details>` and `<summary>` elements

## Examples

For more examples, check the component tests and demo implementations in the repository.
