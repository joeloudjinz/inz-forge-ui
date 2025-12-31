# 🛠 Engineering Retro-Analysis: Angular 21, Vitest & Cypress Integration

**Target Component:** `libs/angular/hyperui/accordion`
**Stack:** Angular 21 (Signals), Nx 22.3, Vite, Vitest, Tailwind 4.

---

## 1. The Signal Immutability Violation in Unit Tests

### 🔴 The Issue

The initial unit tests failed with compilation errors when attempting to mock data:

```typescript
component.items = mockItems; // Error: Cannot assign to 'items' because it is a read-only property.
```

### 🧠 Expert Explanation

In Angular 21+ **Signal Inputs** (`input()`, `input.required()`) are fundamentally different from `@Input()` decorators.

1. **Read-Only:** Signal inputs are exposed as `InputSignal<T>`, which is a read-only interface. You cannot programmatically assign a value to the property on the class instance.
2. **Graph Dependency:** Writing to a signal input conceptually belongs to the *parent* component. In a test, the `ComponentFixture` acts as the parent.

### ✅ The Solution

We moved from direct property assignment to the `ComponentRef` API, which bypasses the class interface and updates the underlying Signal node.

```typescript
// OLD (Legacy @Input pattern)
component.items = mockItems;

// NEW (Signal Pattern)
fixture.componentRef.setInput('items', mockItems);
```

*Note: This triggers a change detection cycle automatically for that specific signal.*

---

## 2. Cypress & Vite: The "Webpack Assumption" Conflict

### 🔴 The Issue

When generating the Cypress config, we encountered:

1. `Your configFile is invalid... Unable to find the 'devServerTarget'`
2. Typescript Error: `Type "vite" is not assignable to type "webpack"`

### 🧠 Expert Explanation

By default, the `@nx/angular` and Cypress plugins assume standard Angular CLI architecture, which relies on **Webpack**.

* **The Conflict:** Your project uses **Vite** (via AnalogJS plugin) for building libraries. The standard Nx Cypress preset tried to look up a `serve` target in `project.json` that didn't exist (because libraries aren't served, they are built/tested).
* **The Type Mismatch:** The Cypress type definitions for `framework: 'angular'` strictly type the bundler as `webpack`. This is a lag in the ecosystem typings, as Angular + Vite is a newer pattern standardized by AnalogJS.

### ✅ The Solution

We implemented a **Custom Dev Server** configuration in `cypress.config.ts` that bypasses the Nx preset entirely.

1. **Explicit Vite Config:** We embedded the `viteConfig` directly inside `cypress.config.ts`.
2. **Type Casting:** We used `as any` on the `devServer` object to silence the TypeScript error, acknowledging that while the types say "Webpack only," the runtime fully supports Vite.
3. **TS Config Resolution:** We had to explicitly point `angular({ tsconfig: ... })` to `tsconfig.cy.json` so the Vite server could compile the test files correctly.

---

## 3. Headless Browser Focus & Accessibility (`tabindex`)

### 🔴 The Issue

The Cypress test `should support keyboard navigation` failed in the headless Electron browser:

```
CypressError: `cy.focus()` can only be called on a valid focusable element. Your subject is a: `<summary>`
```

Additionally, `realPress('Tab')` was flaky, sometimes focusing the address bar instead of the component.

### 🧠 Expert Explanation

* **The Standard:** According to HTML5 specs, `<summary>` is an interactive element and *should* be focusable. Chrome/Firefox handle this natively.
* **The Edge Case:** The **Electron** browser (used by Cypress for headless runs) can be stricter or behave differently regarding implicit focusability of `<summary>` tags compared to a full "headed" Chrome instance.
* **Flakiness:** Relying on `Tab` keypresses in tests implies trusting the browser's initial focus state, which is notoriously unstable in CI/CD environments.

### ✅ The Solution

1. **Forced Focusability:** We added `tabindex="0"` to the `<summary>` element in the HTML template. This creates a contract: "This element is explicitly focusable in the tab order," resolving the Electron issue.
2. **Direct Focus:** We replaced `realPress('Tab')` with `cy.get('summary').first().focus()`. This removes the reliance on the browser's initial state and tests the *component's* logic, not the browser's tabbing logic.

---

## 4. Vitest Environment Initialization (JIT/AOT)

### 🔴 The Issue

Vitest tests failed repeatedly with:

```
Error: Need to call TestBed.initTestEnvironment() first
```

Attempts to use `BrowserDynamicTestingModule` failed with deprecation warnings.

### 🧠 Expert Explanation

* **Zone.js Dependency:** Angular relies on `zone.js` to patch async APIs (setTimeout, Promises) to know when to run Change Detection. `TestBed` requires a special `zone.js/testing` patch.
* **Timing:** The `@analogjs/vitest-angular` helper `setupTestBed()` wraps initialization in `beforeAll`. In some environments, the test suite starts execution *before* this async hook completes, leading to an uninitialized state.
* **Deprecation:** Angular 19+ deprecated `platformBrowserDynamicTesting`. The compiler is now smart enough to handle JIT/AOT resolution without needing separate "Dynamic" platforms in tests.

### ✅ The Solution

We implemented a **Manual Synchronization Pattern** in `test-setup.ts`.

1. **Removal of Abstraction:** We removed `setupTestBed()` and manually called `getTestBed().initTestEnvironment(...)`.
2. **Immediate Execution:** By placing this at the top level of the file (not inside a hook), it guarantees execution when the file is imported.
3. **Modern Platform:** We switched to the non-deprecated `BrowserTestingModule` and `platformBrowserTesting()`.
4. **Files Inclusion:** We explicitly added `"src/test-setup.ts"` to `tsconfig.spec.json`'s `files` array to ensure TypeScript processes these side effects before compiling the specs.

---

## 5. TypeScript Project References (The "Red Squiggle" Fix)

### 🔴 The Issue

Even though Cypress tests were running via CLI, the IDE (VS Code) showed errors:

```
Cannot find name 'describe'.
Cannot find name 'cy'.
```

### 🧠 Expert Explanation

* **Root Cause:** IDEs look at `tsconfig.json` to understand the "Universe" of the project.
* **The Gap:** The library's root `tsconfig.json` knew about `tsconfig.lib.json` (source) and `tsconfig.spec.json` (Vitest), but it had no reference to `tsconfig.cy.json`. Therefore, when opening a `.cy.ts` file, the IDE treated it as a generic TS file without Cypress global types.

### ✅ The Solution

We added the reference to the Solution Map:

```json
// libs/angular/hyperui/accordion/tsconfig.json
"references": [
{"path": "./tsconfig.cy.json"} // Connected the missing link
]
```

---

## Final Resource List

* **Angular Signals in Tests:** [Angular.dev - Component Testing](https://angular.dev/guide/testing/components-scenarios)
* **Vite + Cypress (AnalogJS approach):** [AnalogJS Docs - Testing](https://analogjs.org/docs/features/testing/component)
* **Cypress Real Events:** [GitHub - cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) (Essential for testing hover/focus properly).
* **Angular Deprecations:** [Angular v19 Release Notes](https://blog.angular.dev/) (Regarding `BrowserDynamicTestingModule`).
