<script lang="ts" setup>
import {RouterView} from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="flex h-screen bg-inz-background">
    <Sidebar/>

    <!-- Main content -->
    <main class="flex-1 ml-64 bg-inz-background min-h-screen">
      <Navbar/>

      <div class="max-w-7xl mx-auto px-inz-4 sm:px-inz-6 lg:px-inz-8 py-inz-8">
        <RouterView/>
      </div>
    </main>
  </div>
</template>
