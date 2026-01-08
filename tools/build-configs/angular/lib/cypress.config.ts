import { defineConfig } from 'cypress';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';
import type { UserConfig } from 'vite';

export function getAngularLibCypressConfig(dirname: string) {
  // STRATEGY: Define Vite config with strict typing outside the conflict zone
  const viteConfig: UserConfig = {
    root: dirname,
    plugins: [
      angular({
        tsconfig: resolve(dirname, 'tsconfig.cy.json'),
      }),
      nxViteTsPaths(),
    ],
    // PERFORMANCE FIX: Pre-bundle Angular core to prevent runtime reloading
    optimizeDeps: {
      include: [
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'rxjs',
      ],
    },
  };

  return defineConfig({
    component: {
      devServer: {
        framework: 'angular',
        bundler: 'vite',
        viteConfig,
      } as any, // Cast required: Cypress types do not yet support Angular + Vite combo
      specPattern: '**/*.cy.ts',
      video: false,
      screenshotOnRunFailure: true,
    },
  });
}
