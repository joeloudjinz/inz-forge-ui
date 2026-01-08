/// <reference types='vitest' />
import { defineConfig, mergeConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export interface VueLibViteOptions {
  root: string;
  name: string; // The library name for bundle (e.g., 'accordion')
  entry?: string; // default 'src/index.ts'
  cacheDir?: string; // relative to workspace root typically
  tsconfigPath?: string; // default './tsconfig.lib.json'
}

export const createVueLibViteConfig = (options: VueLibViteOptions) => {
  const {
    root,
    name,
    entry = 'src/index.ts',
    tsconfigPath = 'tsconfig.lib.json',
    cacheDir,
  } = options;

  const workspaceRoot = path.join(root, '../../../../'); // Adjust depth based on lib depth or use known path

  return defineConfig(() => ({
    root,
    cacheDir: cacheDir ?? `../../../../node_modules/.vite/libs/vue/${name}`,
    plugins: [
      vue(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      dts({
        entryRoot: 'src',
        tsconfigPath: path.join(root, tsconfigPath),
        pathsToAliases: false,
      }),
    ],
    build: {
      // Note: outDir is typically handled by Nx executor, but we set a default here just in case
      // It is usually overridden or relative to the root
      outDir: `../../../../dist/libs/vue/hyperui/${name}`, 
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      lib: {
        entry,
        name,
        fileName: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        external: [],
      },
    },
    test: {
      name: `vue-${name}`,
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      pool: 'threads',
      isolate: false,
      coverage: {
        reportsDirectory: `../../../../coverage/libs/vue/hyperui/${name}`,
        provider: 'v8',
      },
    },
  }));
};