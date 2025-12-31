import {defineConfig} from 'cypress';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import angular from '@analogjs/vite-plugin-angular';
import {resolve} from 'path';

export default defineConfig({
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'vite',
      viteConfig: {
        root: __dirname,
        plugins: [
          angular({
            // Explicitly point to the Cypress-specific TS config
            tsconfig: resolve(__dirname, 'tsconfig.cy.json'),
          }),
          nxViteTsPaths(),
        ],
      },
    } as any, // FIX: Cast to 'any' because Cypress types incorrectly expect Webpack for Angular
    // specPattern: 'src/**/*.cy.ts',
    specPattern: '**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: true,
  },
});
