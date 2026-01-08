import angular from '@analogjs/vite-plugin-angular';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import {defineConfig, UserConfigExport} from 'vite';
import {join, relative, resolve} from 'path';

export interface AngularLibViteOptions {
  root: string;
  testName: string;
}

export function getAngularLibViteConfig(options: AngularLibViteOptions): UserConfigExport {
  // workspaceRoot is 4 levels up from this file
  const workspaceRoot = resolve(__dirname, '../../../../');
  const projectRoot = options.root;

  return defineConfig(({mode}) => ({
    root: projectRoot,
    // FIX: Moved from test.cache.dir and used non-deprecated property
    cacheDir: join(workspaceRoot, 'node_modules/.vite', options.testName),
    server: {
      fs: {
        // FIX: Allow Vite to resolve imports from the workspace root (shared utils, tools, etc.)
        allow: [workspaceRoot],
      },
    },
    plugins: [
      nxViteTsPaths(),
      angular({
        tsconfig: join(projectRoot, 'tsconfig.spec.json'),
        workspaceRoot: workspaceRoot, // CRITICAL for resolving setupFiles in monorepos
      }),
    ],
    test: {
      name: options.testName,
      globals: true,
      environment: 'jsdom',
      // FIX: Convert absolute path to a relative path from the library root
      setupFiles: [relative(projectRoot, resolve(__dirname, 'test-setup.ts'))],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: join(workspaceRoot, 'coverage', options.testName),
        provider: 'v8',
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  }));
}
