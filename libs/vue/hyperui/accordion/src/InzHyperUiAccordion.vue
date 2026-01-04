<template>
  <div
    class="inz-accordion-container"
    :class="containerClasses"
    @keydown="handleKeydown"
  >
    <details
      v-for="(item, index) in items"
      :key="index"
      class="group [&_summary::-webkit-details-marker]:hidden"
      :open="item.isExpandedByDefault ? true : undefined"
      :name="exclusive ? groupName : undefined"
    >
      <!--
        Class Merging Strategy:
        1. :class="summaryClasses" -> Tailwind utilities (Layout, Spacing, Default Colors)
        2. class="inz-accordion-summary" -> Applies the CSS Variables defined below
      -->
      <summary :class="summaryClasses" class="inz-accordion-summary" tabindex="0">
        <span class="flex items-center gap-2">
          <i
            v-if="item.iconClass"
            :class="cn('size-5 shrink-0', item.iconClass)"
            aria-hidden="true"
          ></i>
          <span
            v-else-if="item.iconComponent"
            class="size-5 shrink-0 flex items-center justify-center [&>svg]:size-full"
            v-html="item.iconComponent"
          ></span>
          <span>{{ item.title }}</span>
        </span>

        <svg
          class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 ltr:ml-auto rtl:mr-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>

      <div :class="contentClasses" class="inz-accordion-content">
        <p>{{ item.description }}</p>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import {computed, useId} from 'vue';
import {cn} from '@inz-forge-ui/utils';
import {type InzForgeHyperUiAccordionItemModel} from './accordion-item.model';
import {InzForgeHyperUiAccordionModes} from './accordion-modes.enum';

interface Props {
  items: InzForgeHyperUiAccordionItemModel[];
  mode?: InzForgeHyperUiAccordionModes;
  exclusive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: InzForgeHyperUiAccordionModes.simple,
  exclusive: false,
});

// Vue 3.5: Generates a unique, server-safe ID for the accordion group
const groupId = useId();
const groupName = computed(() => `accordion-group-${groupId}`);

// Computed Layout Classes
// keep standard Tailwind colors here (e.g., bg-white) to match the Angular implementation's
// structure, but the CSS Variables in <style> will take precedence for the specific theming
// due to the specific classes (inz-accordion-summary) being applied.

const containerClasses = computed(() => {
  const base = 'w-full';
  switch (props.mode) {
    case InzForgeHyperUiAccordionModes.divided:
      return cn(base, '-mx-4 -my-2 space-y-0 divide-y');
    case InzForgeHyperUiAccordionModes.compact:
      return cn(base, 'space-y-1');
    case InzForgeHyperUiAccordionModes.simple:
    default:
      return cn(base, 'space-y-2');
  }
});

const summaryClasses = computed(() => {
  const base =
    'flex cursor-pointer items-center justify-between gap-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg';

  switch (props.mode) {
    case InzForgeHyperUiAccordionModes.divided:
      return cn(
        base,
        'border-b border-gray-200 rounded-none px-4 py-3 text-gray-900 hover:text-gray-700'
      );
    case InzForgeHyperUiAccordionModes.compact:
      return cn(
        base,
        'rounded px-3 py-2 text-sm text-gray-900 bg-white hover:bg-gray-50'
      );
    case InzForgeHyperUiAccordionModes.simple:
    default:
      return cn(
        base,
        'border border-gray-200 bg-white px-4 py-3 text-gray-900 hover:bg-gray-50'
      );
  }
});

const contentClasses = computed(() => {
  const base = 'text-gray-700';
  switch (props.mode) {
    case InzForgeHyperUiAccordionModes.compact:
      return cn(base, 'p-3');
    case InzForgeHyperUiAccordionModes.divided:
      return cn(base, 'py-4');
    case InzForgeHyperUiAccordionModes.simple:
    default:
      return cn(base, 'p-4');
  }
});

const handleKeydown = (event: KeyboardEvent) => {
  const isNavigation = ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key);
  if (!isNavigation) return;

  const summary = (event.target as HTMLElement).closest('summary');
  if (!summary) return;

  event.preventDefault();

  const container = event.currentTarget as HTMLElement;
  const summaries = Array.from(container.querySelectorAll('summary')) as HTMLElement[];
  const index = summaries.indexOf(summary as HTMLElement);

  if (index === -1) return;

  let nextIndex = index;
  if (event.key === 'ArrowDown') nextIndex = Math.min(index + 1, summaries.length - 1);
  if (event.key === 'ArrowUp') nextIndex = Math.max(index - 1, 0);
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = summaries.length - 1;

  summaries[nextIndex]?.focus();
};
</script>

<style scoped>
.inz-accordion-container {
  /* Default (Light Mode) */
  --accordion-bg: #ffffff;
  --accordion-text: #2d3748;
  --accordion-border: #e2e8f0;
  --accordion-hover-bg: #f7fafc;
  --accordion-divide-color: #e2e8f0;
  --accordion-summary-text: #1a202c;
  --accordion-summary-hover-text: #4a5568;
  --accordion-content-text: #4a5568;
}

/*
  Dark Mode Overrides, supports:
  1. Global dark mode (class on html/body): :global(.dark) .inz-accordion-container
  2. Local dark mode (class on this element): .inz-accordion-container.dark
  3. Data attribute mode: [data-theme='dark']
*/
:global(.dark) .inz-accordion-container,
.inz-accordion-container.dark,
.inz-accordion-container:where([data-theme='dark']) {
  --accordion-bg: #1a202c;
  --accordion-text: #e2e8f0;
  --accordion-border: #4a5568;
  --accordion-hover-bg: #2d3748;
  --accordion-divide-color: #4a5568;
  --accordion-summary-text: #e2e8f0;
  --accordion-summary-hover-text: #cbd5e0;
  --accordion-content-text: #cbd5e0;
}

/* Apply the CSS variables to the accordion elements */
.inz-accordion-container.divide-y {
  border-color: var(--accordion-divide-color);
}

.inz-accordion-summary {
  background-color: var(--accordion-bg);
  color: var(--accordion-summary-text);
  border-color: var(--accordion-border);
}

.inz-accordion-summary:hover {
  background-color: var(--accordion-hover-bg);
  color: var(--accordion-summary-hover-text);
}

.inz-accordion-content {
  color: var(--accordion-content-text);
}
</style>
