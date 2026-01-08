import { defineConfig } from 'cypress';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import type { UserConfig } from 'vite';

export const createVueCypressConfig = (options: {
  root: string;
  alias?: Record<string, string>;
}) => {
  const viteConfig: UserConfig = {
    root: options.root,
    plugins: [vue(), nxViteTsPaths()],
    resolve: {
      alias: options.alias ?? {
        '@': path.resolve(options.root, './src'),
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },
  };

  return defineConfig({
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
};