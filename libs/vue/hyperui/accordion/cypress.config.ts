import { defineConfig } from 'cypress';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import type { UserConfig } from 'vite';

// Extract config for type safety + performance
const viteConfig: UserConfig = {
  root: __dirname,
  plugins: [
    vue(),
    nxViteTsPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // OPTIMIZATION: Pre-bundle Vue to speed up cold start
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
};

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'cypress/support/component-index.html',
    supportFile: 'cypress/support/component.ts',
    video: false,
    screenshotOnRunFailure: true,
  },
});
