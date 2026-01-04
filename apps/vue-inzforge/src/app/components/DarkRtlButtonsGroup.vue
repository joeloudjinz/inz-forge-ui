<template>
  <div class="inline-flex">
    <button
      class="rounded-l-inz-sm border border-inz-border px-inz-3 py-inz-2 font-medium text-inz-foreground transition-colors hover:bg-inz-muted hover:text-inz-foreground focus:z-inz-sticky focus:ring-2 focus:ring-inz-primary focus:ring-offset-2 focus:ring-offset-inz-background focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
      @click="toggleDarkMode"
    >
      {{ isDarkModeOn ? "Light" : "Dark" }}
    </button>

    <button
      class="-ml-px rounded-r-inz-sm border border-inz-border px-inz-3 py-inz-2 font-medium text-inz-foreground transition-colors hover:bg-inz-muted hover:text-inz-foreground focus:z-inz-sticky focus:ring-2 focus:ring-inz-primary focus:ring-offset-2 focus:ring-offset-inz-background focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
      @click="toggleDirection"
    >
      {{ isRtlDirection ? "LTR" : "RTL" }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import {useShowcaseContainer} from '../composables/useShowcaseContainer';

const {isRtlDirection, isDarkModeOn, toggleDarkMode, toggleDirection} = useShowcaseContainer();
</script>
