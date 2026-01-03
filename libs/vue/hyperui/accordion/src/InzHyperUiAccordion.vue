<template>
  <div
    :class="containerClasses"
    class="inz-accordion-container"
    @keydown="handleKeydown"
  >
    <details
      v-for="(item, index) in items"
      :key="index"
      class="group [&_summary::-webkit-details-marker]:hidden"
      :open="item.isExpandedByDefault ? true : undefined"
      :name="exclusive ? groupName : undefined"
    >
      <summary :class="summaryClasses" class="inz-accordion-summary" tabindex="0">
        <span class="flex items-center gap-2">
          <i v-if="item.iconClass" :class="cn('size-5 shrink-0', item.iconClass)"></i>
          <span
            v-else-if="item.iconComponent"
            class="size-5 shrink-0 flex items-center justify-center"
            v-html="item.iconComponent"
          ></span>
          <span>{{ item.title }}</span>
        </span>

        <!-- Right Side: Chevron -->
        <svg
          class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 ltr:ml-auto rtl:mr-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div :class="contentClasses" class="inz-accordion-content">
        <p>{{ item.description }}</p>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { InzForgeHyperUiAccordionItemModel } from './accordion-item.model';
import { InzForgeHyperUiAccordionModes } from './accordion-modes.enum';
import { cn } from '@inz-forge-ui/utils';

interface Props {
  items: InzForgeHyperUiAccordionItemModel[];
  mode?: InzForgeHyperUiAccordionModes;
  exclusive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: () => InzForgeHyperUiAccordionModes.simple,
  exclusive: false,
});

// Generate a unique name for the accordion group if exclusive mode is on
const groupName = ref(`accordion-${Math.random().toString(36).substring(2, 9)}`);

// Computed classes for container based on mode
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

// Computed classes for summary (header) based on mode
const summaryClasses = computed(() => {
  const base = 'flex cursor-pointer items-center justify-between gap-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg';

  switch (props.mode) {
    case InzForgeHyperUiAccordionModes.divided:
      // Divided: No background, just text color changes
      return cn(base, 'border-b border-gray-200 rounded-none px-4 py-3 text-gray-900 hover:text-gray-700');

    case InzForgeHyperUiAccordionModes.compact:
      // Compact: Smaller padding, smaller text, background changes
      return cn(base, 'rounded px-3 py-2 text-sm text-gray-900 bg-white hover:bg-gray-50');

    case InzForgeHyperUiAccordionModes.simple:
    default:
      // Simple: Standard padding, border, background
      return cn(base, 'border border-gray-200 bg-white px-4 py-3 text-gray-900 hover:bg-gray-50');
  }
});

// Computed classes for content (body) based on mode
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

// Keyboard navigation handler
const handleKeydown = (event: KeyboardEvent) => {
  const isNavigation = ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key);
  if (!isNavigation) return;

  const summary = (event.target as HTMLElement).closest('summary');
  if (!summary) return;

  event.preventDefault(); // Prevent page scroll

  const summaries = Array.from(
    event.currentTarget?.querySelectorAll('summary') || []
  ) as HTMLElement[];
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
/* Define CSS variables for light and dark mode */
.inz-accordion-container {
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

/* Dark mode values when .dark class is present */
:root.dark .inz-accordion-container,
.dark .inz-accordion-container {
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