<template>
  <PageHeadline subtitle="Vue implementation of the HyperUI accordion" title="HyperUI Accordion"/>

  <SourceCodeLink link="hyperui/accordion"/>

  <div class="flex justify-between my-2">
    <div class="inline-flex">
      <button
        v-for="(modeOption) in modeButtonGroupOptions"
        :key="modeOption.key"
        :class="{
          '-ml-px': !modeOption.isFirst,
          'rounded-l-inz-sm': modeOption.isFirst,
          'rounded-r-inz-sm': modeOption.isLast,
          'bg-inz-secondary': mode === modeOption.value,
          'text-inz-primary-foreground': mode === modeOption.value
        }"
        class="border border-inz-border px-inz-3 py-inz-2 font-medium text-inz-foreground transition-colors hover:bg-inz-muted hover:text-inz-foreground focus:z-inz-sticky focus:ring-2 focus:ring-inz-primary focus:ring-offset-2 focus:ring-offset-inz-background focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
        @click="setMode(modeOption.key)"
      >
        {{ modeOption.label }}
      </button>
    </div>

    <div class="inline-flex">
      <button
        :class="{
          'line-through': !isExclusive,
          'bg-inz-secondary': isExclusive,
          'text-inz-primary-foreground': isExclusive
        }"
        class="-ml-px border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
        @click="toggleExclusiveMode"
      >
        Exclusive
      </button>
    </div>

    <DarkRtlButtonsGroup/>
  </div>

  <ShowcaseContainer>
    <InzHyperUiAccordion
      :class="{ 'dark': isDarkModeOn }"
      :exclusive="isExclusive"
      :items="AccordionItems"
      :mode="mode"
    />
  </ShowcaseContainer>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useShowcaseContainer} from '../../../../app/composables/useShowcaseContainer';
import PageHeadline from '../../../../app/components/PageHeadline.vue';
import SourceCodeLink from '../../../../app/components/SourceCodeLink.vue';
import DarkRtlButtonsGroup from '../../../../app/components/DarkRtlButtonsGroup.vue';
import ShowcaseContainer from '../../../../app/components/ShowcaseContainer.vue';
import {InzForgeHyperUiAccordionModes, InzHyperUiAccordion} from '@inz-forge-ui/vue/hyperui/accordion';
import {AccordionItems} from './resources';

const {isDarkModeOn, isRtlDirection} = useShowcaseContainer();

// State for mode and exclusive toggle
const mode = ref(InzForgeHyperUiAccordionModes.simple);
const isExclusive = ref(false);

// Define mode button group options
const modeButtonGroupOptions = computed(() => [
  {
    key: "simple",
    label: "Simple",
    value: InzForgeHyperUiAccordionModes.simple,
    isFirst: true,
    isLast: false
  },
  {
    key: "compact",
    label: "Compact",
    value: InzForgeHyperUiAccordionModes.compact,
    isFirst: false,
    isLast: false
  },
  {
    key: "divided",
    label: "Divided",
    value: InzForgeHyperUiAccordionModes.divided,
    isFirst: false,
    isLast: true
  }
]);

const toggleExclusiveMode = () => {
  isExclusive.value = !isExclusive.value;
};

const setMode = (modeKey: string) => {
  const selectedMode = modeButtonGroupOptions.value.find(option => option.key === modeKey);
  if (selectedMode) {
    mode.value = selectedMode.value;
  } else {
    mode.value = InzForgeHyperUiAccordionModes.simple;
  }
};
</script>
