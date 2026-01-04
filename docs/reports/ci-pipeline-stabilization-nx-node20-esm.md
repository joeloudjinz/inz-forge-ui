# Incident Report: CI Pipeline Stabilization (Nx, Node 20, ESM)

**Date:** January 4, 2026

**Subject:** Resolving "Project Graph" Failures & Node.js ESM Race Conditions in GitHub Actions

**Affected Workflows:** `component-tests.yml`, `unit-tests.yml`

---

## 1. Executive Summary

The CI pipeline for `inz-forge-ui` was failing during the **Graph Calculation Phase** (`npx nx affected`), preventing tests from running.
The investigation revealed two distinct issues:

1. **Process Instability:** The Nx Daemon causing unpredictability in the ephemeral CI environment.
2. **Node.js 20 + ESM Race Condition:** A critical incompatibility between Node.js v20, Native ESM configuration files (`.mts`), and parallel execution, leading to internal assertion errors (`Unexpected module status 0`).

The solution involved stabilizing the CI environment by disabling the daemon and migrating configuration files from Native ESM (`.mts`) to TypeScript (`.ts`) to bypass the buggy Node.js loader.

---

## 2. Issue Breakdown & Debugging Process

### Issue A: "Failed to process project graph" (Generic)

**Symptoms:**
The `component-tests` workflow failed immediately with `Exit Code 1` and no useful error logs.

**Diagnosis:**
In CI environments (GitHub Actions), the **Nx Daemon**—a background process designed to speed up local development by caching the file graph—can sometimes fail to communicate with the main process or run out of memory.

**Action Taken:**
We introduced the `NX_DAEMON=false` environment variable.

* **Why:** This forces Nx to calculate the project graph in the *current* process for every run. While slightly slower (seconds), it eliminates inter-process communication failures, making CI deterministic and robust.

### Issue B: The "Node.js Internal Assertion" Crash

**Symptoms:**
Once `component-tests` passed, `unit-tests` failed with:

```text
Error [ERR_INTERNAL_ASSERTION]: Unexpected module status 0.
Cannot require() ES Module ... because it is not yet fully loaded.
```

**Diagnosis:**
The project used `vite.config.mts` files. The `.mts` extension forces Node.js to use its **Native ESM Loader**.

* **The Bug:** In Node.js v20+ (specifically >20.10), the native loader has a known thread-safety defect when multiple threads (spawned by `nx affected --parallel`) attempt to load ESM configuration files simultaneously.
* **The Result:** A race condition occurs in Node's internal module cache, causing the process to crash.

---

## 3. Deep Dive: Native ESM vs. Transpiled TypeScript

To understand the fix, we must distinguish between how Node handles `.mts` vs. `.ts`.

### The Problem: `.mts` (Native Execution)

When you name a file `config.mts`, you are telling Node.js: *"This is a native ECMAScript Module. Please use your internal C++ loader to parse and execute it."*

* **Pros:** Native standard compliance.
* **Cons:** Node's internal loader is still maturing. As discovered, it currently crashes under high-concurrency read operations (like Nx Graph calculation).

### The Solution: `.ts` (Vite/Esbuild Execution)

When you name a file `config.ts`, Node.js cannot read it natively (it doesn't understand TypeScript types).

* **The Mechanism:** Tools like Vite (or Nx) intercept the file load. They use **esbuild** or **ts-node** to:

1. Read the `.ts` file.
2. Transpile it into standard CommonJS (CJS) or simple JS in memory.
3. Feed the result to Node.js.

* **Why it fixes the bug:** This bypasses Node's buggy Native ESM loader entirely. The transpilation happens in a stable, isolated user-land process, which is then safely loaded by Node.

---

## 4. Implemented Solutions

### Step 1: Migration to Standard TypeScript Configs

We moved away from Native ESM configurations to standard TypeScript configurations.

**Action:**
Renamed all occurrences of `vite.config.mts` $\rightarrow$ `vite.config.ts`.

* `libs/angular/hyperui/accordion/vite.config.mts` $\rightarrow$ `.ts`
* `libs/vue/hyperui/accordion/vite.config.mts` $\rightarrow$ `.ts`
* `libs/shared/utils/vite.config.mts` $\rightarrow$ `.ts`

**Config Updates:**
Updated `project.json` files to reference the new extensions:

```json
"targets": {
  "test": {
    "options": {
      "configFile": "libs/.../vite.config.ts" // Was .mts
    }
  }
}
```

### Step 2: CI Environment Stabilization

We standardized the GitHub Actions workflows to ensure consistent execution.

**Updates to `.github/workflows/*.yml`:**

```yaml
env:
  NX_DAEMON: 'false' # Disables the background server for stability
```

---

## 5. Future Recommendations & Best Practices

### 1. File Extensions in Monorepos

* **Use `.ts` for Configs:** For tooling configs (`vite.config.ts`, `cypress.config.ts`, `jest.config.ts`), prefer `.ts` over `.mts`. The tooling ecosystem (Vite, Nx, Cypress) handles `.ts` transpilation much more reliably than Node handles native `.mts` loading in parallel contexts.
* **Use `.ts` for Source:** Continue using `.ts` for your actual application code.

### 2. Node.js Versions in CI

* **Stick to LTS:** You are currently on **Node 20 (LTS)**. This is correct.
* **Awareness:** Be aware that "Bleeding Edge" Node features (like the Native ESM loader) often have subtle bugs in edge cases like high-concurrency CI environments.

### 3. Debugging Nx in CI

If a workflow fails silently (exit code 1 with no logs):

1. **Kill the Daemon:** Set `NX_DAEMON: false`.
2. **Verbose Mode:** Add `--verbose` to the Nx command.
3. **Graph Check:** Run `npx nx graph` locally. If it works locally but fails in CI, it is almost always an environment difference (Node version, OS, or Dependency installation).
