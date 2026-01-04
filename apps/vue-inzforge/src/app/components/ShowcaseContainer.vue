<template>
  <div
    :class="{ 'bg-inz-foreground': isDarkModeOn }"
    :dir="isRtlDirection ? 'rtl' : 'ltr'"
    class="p-inz-10 border-2 inz-border rounded-inz-md bg-inz-background transition-colors duration-300"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {useShowcaseContainer} from '../composables/useShowcaseContainer';

const {isRtlDirection, isDarkModeOn} = useShowcaseContainer();
</script>
