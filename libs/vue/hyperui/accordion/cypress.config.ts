import { defineConfig } from 'cypress';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      // Define config inline to avoid string-path type errors and CJS/ESM conflicts
      viteConfig: {
        root: __dirname,
        plugins: [
          vue(),
          nxViteTsPaths(), // Enables resolving @inz-forge-ui/utils
        ],
        resolve: {
          alias: {
            // Ensure any other aliases are captured if necessary
            '@': path.resolve(__dirname, './src'),
          },
        },
      },
    },
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'cypress/support/component-index.html',
    supportFile: 'cypress/support/component.ts',
  },
});
