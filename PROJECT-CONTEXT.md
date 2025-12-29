# INZFORGE UI: MASTER PROJECT CONTEXT

## 1. IDENTITY & PHILOSOPHY

**InzForge** is a "Source-First" blueprint registry. We do not distribute compiled NPM packages; we provide **production-grade engineering blueprints**.

- **Distribution Model:** Shadcn-style. The source code is the final product.
- **Blueprint Concept:** Every component is an isolated library (`libs/`) that users can "pluck" and integrate into their own projects.
- **Framework Parity:** Every UI design implementation must be mirrored: if it exists in Angular, it must be implemented with a mirrored API in Vue.

## 2. TECHNICAL STACK VERSIONS

- **Monorepo:** Nx 22.3.x
- **Angular:** 21.0.x (Standalone, Signals-First)
- **Vue:** 3.5.x (Composition API, `<script setup>`)
- **Styling:** TailwindCSS 4.1.x (utilizing `@tailwindcss/postcss`)
- **Testing:** Cypress (Component), Playwright (E2E), Vitest (Unit)
- **Language:** TypeScript 5.9.x

## 3. CORE ENGINEERING STANDARDS

### A. Angular 21 (Signals-Only Architecture)

- **NO LEGACY:** Absolutely no `@Input`, `@Output`, `@ViewChild`, or `NgModules`.
- **Signals API:** Use `input()`, `input.required()`, `output()`, and `model()` for two-way binding.
- **Reactivity:** Use `computed()` for derived state and `effect()` only when necessary for DOM side-effects.
- **Performance:** Strictly use `ChangeDetectionStrategy.OnPush`.
- **Component Style:** Use `ViewEncapsulation.Emulated` by default.

### B. Vue 3.5 (Composition API)

- **Syntax:** Strictly `<script setup lang="ts">`.
- **Reactivity:** Use `ref()` for all state and `computed()` for derived values.
- **Macros:** Use `defineProps<{...}>()` and `defineEmits<{...}>()`.
- **Encapsulation:** Use `<style scoped>` for component-specific styles.

### C. Branding & Naming

- **Prefix:** All components must use the `inz-` prefix (e.g., `inz-accordion`).
- **Files:** Follow `[name].[type].ts` convention (e.g., `accordion.component.ts`, `accordion-item.model.ts`).

## 4. MONOREPO STRUCTURE

Libraries are organized by framework and design source:

- `libs/shared/utils`: Single source of truth for `theme.css` and global `utils.ts` (Tailwind merging).
- `libs/angular/[design-source]/[component-name]`: e.g., `libs/angular/hyperui/accordion`.
- `libs/vue/[design-source]/[component-name]`: e.g., `libs/vue/hyperui/accordion`.
- `apps/angular-inzforge`: The Angular showcase/documentation gallery.
- `apps/vue-inzforge`: The Vue showcase/documentation gallery.

## 5. THE PORTABILITY PROTOCOL (SHADCN RULES)

Components must be "Ejection-Ready":

1. **Self-Containment:** Styles reside in `[name].component.css` or scoped blocks. Use Tailwind `@apply` for complex utility compositions.
2. **Dependency Declaration:** Explicitly document external peer dependencies (e.g., `lucide-angular`, `clsx`) in the library's `README.md`.
3. **Import Resolution:** All components depend on `@inzforge/shared/utils`. When generating blueprints for external use, provide instructions to resolve these to local relative paths.
4. **Theme Alignment:** Reference CSS variables defined in `libs/shared/utils/src/lib/theme.css`.

## 6. TESTING MANDATE

Every component must satisfy two testing layers:

- **Cypress Component Testing:** Located within the library. Focus on internal logic, ARIA attribute correctness, and keyboard navigation (`Tab`, `Space`, `Enter`, `Esc`).
- **Playwright E2E:** Located in `apps/[app]-e2e`. Focus on cross-browser rendering (WebKit, Firefox, Chromium) within the Showcase App.

## 7. CLI COMMANDS FOR AGENTS

Agents must use these commands to maintain workspace integrity. Do not use `serve` commands.

### Library Generation

```bash
# Angular Component Lib (Standalone)
npx nx g @nx/angular:library libs/angular/[source]/[name] --directory=libs/angular/[source]/[name] --standalone --unitTestRunner=vitest

# Vue Component Lib
npx nx g @nx/vue:library libs/vue/[source]/[name] --directory=libs/vue/[source]/[name] --unitTestRunner=vitest
```

### Verification & Testing

```bash
# Run Vitest Unit Tests
npx nx test [project-name]

# Run Cypress Component Tests
npx nx component-test [project-name]

# Run Playwright E2E Tests
npx nx e2e [app-name]-e2e

# Linting
npx nx lint [project-name]
```

## 8. STYLING & TAILWIND 4 RULES

- **Tokens:** Map Tailwind classes to CSS variables found in `theme.css` (e.g., `bg-[var(--inz-primary)]`).
- **Dynamic Classes:** Always use the `cn()` utility from `@inzforge/shared/utils` for conditional class joining.
- **Animations:** Use `tailwindcss-animate` for all transition/state-change logic.

## 9. FORBIDDEN PATTERNS

- **NO `any`:** All props, inputs, and state must be strictly typed.
- **NO mixing:** Components must remain standalone. An `inz-accordion` cannot import an `inz-button` library; it must remain self-contained or use content projection.
- **NO Hardcoded Hex:** All colors must reference the `inz` token system or Tailwind's semantic palette.
- **NO legacy RxJS:** Do not use `BehaviorSubject` or `Observable` for state that can be handled by Angular Signals or Vue Refs.

---
**Agent Note:** You are operating in **2025 Modern Engineering Mode**. Prioritize portability, accessibility, and strict adherence to the Signal/Composition reactivity models.
