# 🛠 INZFORGE UI: MASTER PROJECT CONTEXT

## 1. PROJECT VISION & PHILOSOPHY
**InzForge** is a "Source-First" blueprint registry. We do not distribute compiled packages; we distribute **production-grade engineering blueprints**.
- **Distribution:** Shadcn-style. Source code is the product.
- **Independence:** Every component must be "pluggable" into a raw Angular or Vue project with minimal friction.
- **Consistency:** If a design exists in Angular, it must exist with a mirrored API in Vue.

## 2. ENGINEERING STANDARDS

### A. Angular 21+ (Modern Signals Architecture)
- **NO Legacy:** Strictly no `@Input()`, `@Output()`, or `ViewChild()`. No `NgModules`.
- **Signals:** Use `input()`, `input.required()`, `output()`, and `model()`.
- **Logic:** Use `computed()` for derived state. Use `effect()` sparingly.
- **Change Detection:** Strictly `ChangeDetectionStrategy.OnPush`.
- **Encapsulation:** Default to `ViewEncapsulation.Emulated`. Use `ViewEncapsulation.None` only for global utility styles.

### B. Vue 3 (Modern Composition API)
- **Syntax:** Strictly `<script setup lang="ts">`.
- **State:** Use `ref()` for all state. Use `computed()` for derived values.
- **Props/Emits:** Use `defineProps<{...}>()` and `defineEmits<{...}>()`.
- **Styling:** Use `<style scoped>` to ensure component isolation.

### C. Branding & Naming
- **Prefix:** Every component must be prefixed with `inz-` (e.g., `inz-button.component.ts`, `InzButton.vue`).
- **Workspace:** The root namespace is `inzforge`.

## 3. MONOREPO ARCHITECTURE (NX)
We follow **Option A: One Library per Component**.
- `libs/shared/utils`: The single shared dependency. Contains the `cn()` (tailwind-merge) helper and design tokens.
- `libs/angular/[design-source-name]/[component-name]`: Individual isolated libraries.
- `libs/vue/[design-source-name]/[component-name]`: Individual isolated libraries.
- `apps/*-inzforge`: Showcase applications that serve as live documentation.

## 4. THE PORTABILITY PROTOCOL (CRITICAL)
When an agent is asked to "Generate an Integration Blueprint" for a component:
1. **Self-Containment:** The component must include its own Tailwind `@apply` CSS block.
2. **Dependency Mapping:** Explicitly list any external peer dependencies (e.g., `lucide-angular`, `clsx`).
3. **Import Resolution:** Change `@inzforge/shared/utils` to a local relative import (e.g., `../../utils/inz-logic.ts`) or provide the utility code as part of the output.
4. **Zero Global CSS:** The component should not rely on a global `styles.css` other than the base Tailwind directives.

## 5. DUAL-LAYER TESTING MANDATE
Every component implementation is incomplete without:

### Layer 1: Cypress Component Testing (Visual/Interactive)
- Purpose: Logic validation, event emission, and visual state checks (hover, focus).
- Location: `libs/[framework]/[component]/cypress/...`
- Constraint: Tests must verify ARIA roles and keyboard accessibility (`Enter`, `Space`, `Tab`, `Esc`).

### Layer 2: Playwright E2E (Cross-Browser Stability)
- Purpose: Cross-browser rendering validation (Chromium, Firefox, WebKit).
- Location: `apps/[framework]-inzforge-e2e/...`
- Constraint: Must test the component within the context of the Showcase App layout.

## 6. STYLING & THEMING
- **Design Tokens:** Always map Tailwind classes to CSS variables where possible (e.g., `bg-[var(--inz-primary)]`).
- **Shared Config:** Use the `tailwind.config.base.js` from the root.
- **Animations:** Prefer `tailwindcss-animate` for consistent transitions.

## 7. AI WORKFLOW CHEAT SHEET
When asked to perform a task, follow this sequence:
1. **Analyze:** Check the existing `shared/utils` for existing logic.
2. **Generate:** Run Nx generators:
    - `npx nx g @nx/angular:library libs/angular/[name] --standalone`
    - `npx nx g @nx/vue:library libs/vue/[name]`
3. **Draft:** Implement the logic in Angular first (Signals), then mirror to Vue.
4. **Test:** Configure and write Cypress tests immediately.
5. **Document:** Update the Showcase App to include the new component.

## 8. FORBIDDEN PATTERNS
- **NO legacy RxJS** where Signals can be used (Angular).
- **NO Options API** (Vue).
- **NO `any` types.** Everything must be strictly typed.
- **NO hardcoded hex colors.** Use the `inz` token system.
- **NO mixing of components.** A `Button` cannot import a `Card` directly; they must remain standalone.

---
**Agent Note:** You are operating in **2025 Standard Mode**. Efficiency, portability, and "inz"-centric branding are your highest priorities.
