<template>
  <a :href="link" class="hover:font-bold hover:underline transition-all fade-out duration-500" target="_blank">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
defineProps<{
  link: string;
}>();
</script>
