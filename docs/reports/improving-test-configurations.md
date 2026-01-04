# Improving Test Configurations - Angular v21 + Vue v3.5

**Date:** January 4, 2026

**Scope:** Test Infrastructure Configuration (Vitest, Cypress, TypeScript)

## 1. Executive Summary

We performed a comprehensive audit of the test configuration for a hybrid Nx Monorepo containing Angular v21 (Bleeding Edge) and Vue v3.5 libraries. The primary objectives were to align the test environment with modern framework features (Zoneless Change Detection), resolve deprecation warnings in Vitest v4, fix TypeScript conflicts in Cypress, and optimize execution speed.

**Key Outcomes:**

* **Angular Unit Tests:** 22% execution speed improvement (1.06s to 825ms).
* **Vue Unit Tests:** 22% execution speed improvement (569ms to 442ms).
* **Stability:** Removed fragile `any` type casting in Cypress configurations.
* **Modernization:** Fully migrated to Zoneless testing for Angular v21.

---

## 2. Detailed Improvements

### A. Angular Test Environment (Migration to Zoneless)

**Context:**
The project uses Angular v21, which defaults to Zoneless change detection. The original configuration forced the legacy `zone.js` environment, causing unnecessary overhead and potential hydration mismatches.

**Changes:**

* Removed `import 'zone.js'` and `import 'zone.js/testing'`.
* Replaced standard TestBed initialization with the AnalogJS `setupTestBed` helper.
* Enabled `zoneless: true` to match the application runtime.

**File:** `libs/angular/hyperui/accordion/tests/test-setup.ts`

```typescript
import '@analogjs/vitest-angular/setup-snapshots';
import {setupTestBed} from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({
  zoneless: true,
});
```

### B. Vitest Performance Tuning (Threading & Pooling)

**Context:**
The default Vitest configuration creates a new JSDOM environment for every test file. This is memory-intensive and slow. Additionally, Vitest v4 introduced breaking changes by moving `poolOptions` to the top level.

**Changes:**

* **Pool Strategy:** Switched to `pool: 'threads'` to utilize worker threads.
* **Isolation:** Set `isolate: false`. This allows the JSDOM environment to be reused across test files, significantly reducing overhead. This is safe because `setupTestBed` handles cleanup between tests.
* **Deprecation Fix:** Moved `isolate` to the top-level `test` object to resolve the Vitest v4 warning.

**File:** `libs/angular/hyperui/accordion/vite.config.ts` (and Vue equivalent)

```typescript
test: {
  // ... globals and setup
  pool: 'threads',
    isolate
:
  false,
  // ... coverage
}
```

### C. Cypress Type Safety and Build Optimization

**Context:**
Cypress type definitions strictly associate `framework: 'angular'` with Webpack. Since this project uses Vite (via AnalogJS), the configuration raised type errors, originally suppressed by casting the entire object to `any`.

**Changes:**

* **Strict Typing:** Defined a standalone `viteConfig` object typed as `UserConfig`.
* **Targeted Suppression:** Used `@ts-expect-error` only on the conflicting `devServer` property, maintaining type safety for the rest of the file.
* **Performance:** Added `optimizeDeps` to pre-bundle Angular and Vue core packages, preventing browser reload loops during the initial test run.
* **TS Config:** Updated `moduleResolution` to `bundler` in `tsconfig.cy.json` to support Vite-specific imports.

**File:** `libs/angular/hyperui/accordion/cypress.config.ts`

```typescript
const viteConfig: UserConfig = {
  // ... plugins
  optimizeDeps: {
    include: ['@angular/core', 'rxjs', ...], // Pre-bundling for speed
  },
};

export default defineConfig({
  component: {
    devServer: {
      // @ts-expect-error - Cypress types expect Webpack for Angular
      framework: 'angular',
      bundler: 'vite',
      viteConfig,
    },
    // ...
  },
});
```

### D. Workspace Hygiene

**Context:**
The root `vitest.workspace.ts` used a greedy glob pattern (`**/vite.config.{ts,js}`) which inadvertently targeted build configurations or unrelated files.

**Changes:**

* Restricted the workspace definition to specific library paths (`libs/angular/...`, `libs/vue/...`).
* Removed the `defineWorkspace` import to resolve a TS2305 error caused by the root `tsconfig.base.json` lacking Vitest types.

**File:** `vitest.workspace.ts`

```typescript
export default [
  'libs/angular/hyperui/*/vite.config.ts',
  'libs/vue/hyperui/*/vite.config.ts',
];
```

---

## 3. References & Resources

The following documentation and issues were referenced to validate the recommendations:

1. **AnalogJS Documentation:** *Testing with Vitest (Zoneless Setup)*

   - Used to verify `setupTestBed` and correct usage for Angular v18+.

2. **Vitest Migration Guide (v3 to v4):**

   - Used to identify the removal of `poolOptions` and the correct placement of `isolate`.

3. **Vitest GitHub Issues (#686, #2161):**

   - Referenced regarding memory leaks in `vmThreads` and the recommendation to use `threads` for Angular/JSDOM environments.

4. **Cypress Documentation:** *Component Testing Configuration*

   - Used to verify the limitations of the `DevServerConfigOptions` type regarding Vite + Angular.

5. **Vite Documentation:** *Dep Optimization Options*

   - Used to configure `optimizeDeps` for faster cold starts.
