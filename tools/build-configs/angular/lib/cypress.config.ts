// tools/build-configs/angular/lib/cypress.config.ts
import { defineConfig } from 'cypress';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'path';

export function getAngularLibCypressConfig(dirname: string) {
  return defineConfig({
    component: {
      devServer: {
        framework: 'angular',
        bundler: 'vite',
        // Pass the Vite config object directly here
        viteConfig: {
          root: dirname,
          plugins: [
            angular({
              tsconfig: resolve(dirname, 'tsconfig.cy.json'),
            }),
            nxViteTsPaths(),
          ],
          server: {
            fs: {
              // Allow access to workspace root for shared configs/assets
              allow: [resolve(dirname, '../../../../')],
            },
          },
        },
      } as any, // Cast to any is still required due to a known Cypress/Angular type mismatch
      specPattern: '**/*.cy.ts',
    },
  });
}
