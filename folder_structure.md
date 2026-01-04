## Project Folder Structure
Generated on: Sun Jan  4 10:49:20 CET 2026
*(Respected .gitignore rules)*

```text
inz-forge-ui/
├── .editorconfig
├── .github/
│   └── workflows/
│       ├── component-tests.yml
│       └── unit-tests.yml
├── .gitignore
├── .nx/
├── .prettierignore
├── .prettierrc
├── .vscode/
│   └── extensions.json
├── PROJECT-CONTEXT.md
├── README.md
├── apps/
│   ├── angular-inzforge/
│   │   ├── .postcssrc.json
│   │   ├── eslint.config.mjs
│   │   ├── project.json
│   │   ├── public/
│   │   │   └── joeinz-baw-logo.svg
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── app.html
│   │   │   │   ├── app.routes.ts
│   │   │   │   ├── app.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── home/
│   │   │   │   │   │   ├── home.component.html
│   │   │   │   │   │   └── home.component.ts
│   │   │   │   │   └── hyperui/
│   │   │   │   │       └── accordion/
│   │   │   │   │           ├── hyperui-accordion-page.component.html
│   │   │   │   │           ├── hyperui-accordion-page.component.ts
│   │   │   │   │           └── resources.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── theme.service.ts
│   │   │   │   └── shared/
│   │   │   │       └── components/
│   │   │   │           ├── app-navbar/
│   │   │   │           │   └── app-navbar.component.ts
│   │   │   │           ├── app-sidebare/
│   │   │   │           │   ├── sidebar.component.css
│   │   │   │           │   ├── sidebar.component.html
│   │   │   │           │   └── sidebar.component.ts
│   │   │   │           ├── dark-rtl-buttons-group/
│   │   │   │           │   └── dark-rtl-buttons-group.component.ts
│   │   │   │           ├── page-headline/
│   │   │   │           │   └── page-headline.component.ts
│   │   │   │           ├── showcase-container/
│   │   │   │           │   ├── showcase-container.component.ts
│   │   │   │           │   └── showcase-container.service.ts
│   │   │   │           ├── simple-animated-text-link/
│   │   │   │           │   └── simple-animated-text-link.component.ts
│   │   │   │           └── source-code-link/
│   │   │   │               └── source-code-link.component.ts
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.app.json
│   │   └── tsconfig.json
│   └── vue-inzforge/
│       ├── .postcssrc.json
│       ├── eslint.config.mjs
│       ├── index.html
│       ├── project.json
│       ├── public/
│       │   └── joeinz-baw-logo.svg
│       ├── src/
│       │   ├── app/
│       │   │   ├── App.vue
│       │   │   ├── components/
│       │   │   │   ├── DarkRtlButtonsGroup.vue
│       │   │   │   ├── Navbar.vue
│       │   │   │   ├── PageHeadline.vue
│       │   │   │   ├── ShowcaseContainer.vue
│       │   │   │   ├── Sidebar.vue
│       │   │   │   ├── SimpleAnimatedTextLink.vue
│       │   │   │   └── SourceCodeLink.vue
│       │   │   └── composables/
│       │   │       └── useShowcaseContainer.ts
│       │   ├── main.ts
│       │   ├── router/
│       │   │   └── index.ts
│       │   ├── styles.css
│       │   ├── views/
│       │   │   ├── HomeView.vue
│       │   │   └── components/
│       │   │       └── hyperui/
│       │   │           └── accordion/
│       │   │               ├── AccordionPage.vue
│       │   │               └── resources.ts
│       │   └── vue-shims.d.ts
│       ├── tailwind.config.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── docs/
│   ├── explanations/
│   │   └── utils/
│   │       ├── how-to-use-theme-css-file.md
│   │       └── shared-theme-syntax.md
│   ├── prompts/
│   │   └── my-swe-assistant-pro.md
│   └── reports/
│       ├── ci-pipeline-stabilization-nx-node20-esm.md
│       ├── integrating-and-configuring-test-frameworks-for-accordion-component.md
│       └── integrating-tailwindcss-with-angular-app.md
├── eslint.config.mjs
├── file-context-packer.script.sh
├── libs/
│   ├── angular/
│   │   └── hyperui/
│   │       ├── README.md
│   │       └── accordion/
│   │           ├── README.md
│   │           ├── cypress/
│   │           │   ├── screenshots/
│   │           │   └── support/
│   │           │       ├── commands.ts
│   │           │       ├── component-index.html
│   │           │       └── component.ts
│   │           ├── cypress.config.ts
│   │           ├── eslint.config.mjs
│   │           ├── project.json
│   │           ├── src/
│   │           │   ├── Source.md
│   │           │   ├── accordion-item.model.ts
│   │           │   ├── accordion-modes.enum.ts
│   │           │   ├── accordion.component.css
│   │           │   ├── accordion.component.html
│   │           │   ├── accordion.component.ts
│   │           │   └── index.ts
│   │           ├── tests/
│   │           │   ├── accordion.component.cy.ts
│   │           │   ├── accordion.component.spec.ts
│   │           │   └── test-setup.ts
│   │           ├── tsconfig.cy.json
│   │           ├── tsconfig.json
│   │           ├── tsconfig.lib.json
│   │           ├── tsconfig.spec.json
│   │           └── vite.config.ts
│   ├── shared/
│   │   └── utils/
│   │       ├── README.md
│   │       ├── eslint.config.mjs
│   │       ├── project.json
│   │       ├── src/
│   │       │   ├── index.ts
│   │       │   └── lib/
│   │       │       ├── theme.css
│   │       │       └── utils.ts
│   │       ├── tsconfig.json
│   │       └── tsconfig.lib.json
│   └── vue/
│       └── hyperui/
│           └── accordion/
│               ├── README.md
│               ├── cypress/
│               │   ├── screenshots/
│               │   └── support/
│               │       ├── component-index.html
│               │       └── component.ts
│               ├── cypress.config.ts
│               ├── eslint.config.mjs
│               ├── package.json
│               ├── project.json
│               ├── src/
│               │   ├── InzHyperUiAccordion.vue
│               │   ├── accordion-item.model.ts
│               │   ├── accordion-modes.enum.ts
│               │   ├── index.ts
│               │   └── vue-shims.d.ts
│               ├── tests/
│               │   ├── accordion.component.cy.ts
│               │   └── accordion.spec.ts
│               ├── tsconfig.cy.json
│               ├── tsconfig.json
│               ├── tsconfig.lib.json
│               ├── tsconfig.spec.json
│               └── vite.config.ts
├── nx.json
├── package-lock.json
├── package.json
├── tailwind.config.base.js
├── tsconfig.base.json
└── vitest.workspace.ts
```
