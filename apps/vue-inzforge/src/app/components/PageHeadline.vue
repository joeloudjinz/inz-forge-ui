<template>
  <h1 class="text-inz-3xl font-bold mb-inz-3 text-inz-foreground">
    {{ title || "UNSPECIFIED HEADLINE TITLE" }}
  </h1>
  <h3 v-if="subtitle" class="text-inz-lg font-light text-inz-muted-foreground mt-inz-1 mb-inz-3">
    {{ subtitle }}
  </h3>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>
