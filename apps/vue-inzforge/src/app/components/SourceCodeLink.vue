<template>
  <div v-if="link" class="py-inz-3">
    <div class="flex justify-between">
      <p>
        You can find the source code on
        <SimpleAnimatedTextLink :link="fullLink">
          GitHub
        </SimpleAnimatedTextLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import SimpleAnimatedTextLink from './SimpleAnimatedTextLink.vue';

const props = defineProps<{
  link: string;
}>();

const BASE_URL = "https://github.com/joeloudjinz/inz-forge-ui/tree/main/libs/vue/";

const fullLink = computed(() => `${BASE_URL}${props.link}`);
</script>
