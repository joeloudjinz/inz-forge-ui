<template>
  <div class="fixed inset-y-0 left-0 z-inz-sticky w-64 bg-inz-background border-r border-inz-border">
    <div class="h-full overflow-y-auto pt-inz-4 px-inz-6">
      <h3 class="text-inz-xl font-semibold mb-inz-4">Content</h3>
      <ul class="list-none p-0 m-0 flex flex-col space-y-inz-1">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :class="{ '!bg-inz-secondary !text-inz-accent-foreground': isActive(item.path) }"
            :to="item.path"
            class="flex items-center w-full py-inz-2 px-inz-3 font-medium text-inz-foreground rounded-inz-md transition-colors duration-inz-normal hover:bg-inz-muted"
          >
            <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ item.label }}</span>
          </router-link>

          <!-- Render child items if they exist -->
          <ul
            v-if="item.children && item.children.length > 0"
            class="list-none p-0 m-0 pt-inz-2 flex flex-col space-y-inz-1 ml-inz-4"
          >
            <li v-for="child in item.children" :key="child.path">
              <router-link
                :to="child.path"
                active-class="bg-inz-secondary text-inz-accent-foreground"
                class="flex items-center w-full py-inz-2 px-inz-3 text-inz-sm font-medium rounded-inz-md transition-colors duration-inz-normal hover:bg-inz-muted"
              >
                <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ child.label }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';

interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

const route = useRoute();
const router = useRouter();

// Define menu items based on the router configuration
const menuItems = computed<MenuItem[]>(() => {
  return [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'HyperUI',
      path: '/hyperui',
      children: [
        {
          label: 'Accordion',
          path: '/hyperui/accordion',
        }
      ]
    }
  ];
});

const isActive = (path: string) => {
  return route.path === path;
};

onMounted(() => {
  // Any initialization logic if needed
});
</script>
