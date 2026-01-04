/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    root: __dirname,
    cacheDir: '../../../../node_modules/.vite/libs/angular/hyperui/accordion',

    plugins: [
      angular({
        tsconfig: `${__dirname}/tsconfig.spec.json`
      }),
      nxViteTsPaths()
    ],

    test: {
      name: 'ng-accordion',
      globals: true,
      environment: 'jsdom',
      setupFiles: ['tests/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],

      // Using threads with isolation disabled, this is the V4 way to configure it:
      pool: 'threads',
      isolate: false,

      coverage: {
        reportsDirectory: '../../../../coverage/libs/angular/hyperui/accordion',
        provider: 'v8',
      },
    },

    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
