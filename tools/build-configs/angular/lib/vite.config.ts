/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { UserConfigExport, defineConfig } from 'vite';

export interface AngularLibViteOptions {
  root: string;
  cacheDir: string;
  testName: string;
  reportsDirectory: string;
  tsconfigPath?: string;
}

// FIX: Changed return type from 'UserConfig' to 'UserConfigExport'
export function getAngularLibViteConfig(options: AngularLibViteOptions): UserConfigExport {
  return defineConfig(({ mode }) => {
    return {
      root: options.root,
      cacheDir: options.cacheDir,
      plugins: [
        angular({
          tsconfig: options.tsconfigPath ?? `${options.root}/tsconfig.spec.json`,
        }),
        nxViteTsPaths(),
      ],
      test: {
        name: options.testName,
        globals: true,
        environment: 'jsdom',
        setupFiles: ['tests/test-setup.ts'],
        include: ['**/*.spec.ts'],
        reporters: ['default'],
        pool: 'threads',
        isolate: false,
        coverage: {
          reportsDirectory: options.reportsDirectory,
          provider: 'v8',
        },
      },
      define: {
        'import.meta.vitest': mode !== 'production',
      },
    };
  });
}
