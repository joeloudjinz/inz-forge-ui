## Project Folder Structure
Generated on: Fri Jan  2 20:26:47 CET 2026
*(Respected .gitignore rules)*

```text
inz-forge-ui/
├── .editorconfig
├── .github/
│   └── workflows/
│       ├── angular.hyperui.component-tests.yml
│       └── angular.hyperui.unit-tests.yml
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
│   │   │   └── favicon.ico
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
│       ├── eslint.config.mjs
│       ├── index.html
│       ├── project.json
│       ├── src/
│       │   ├── app/
│       │   │   ├── App.spec.ts
│       │   │   ├── App.vue
│       │   │   └── NxWelcome.vue
│       │   ├── main.ts
│       │   ├── router/
│       │   │   └── index.ts
│       │   ├── styles.css
│       │   ├── views/
│       │   │   ├── AboutView.vue
│       │   │   └── HomeView.vue
│       │   └── vue-shims.d.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       └── vite.config.mts
├── docs/
│   ├── explanations/
│   │   └── utils/
│   │       ├── how-to-use-theme-css-file.md
│   │       └── shared-theme-syntax.md
│   ├── prompts/
│   │   └── my-swe-assistant-pro.md
│   └── reports/
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
│   │           └── vite.config.mts
│   └── shared/
│       └── utils/
│           ├── README.md
│           ├── eslint.config.mjs
│           ├── project.json
│           ├── src/
│           │   ├── index.ts
│           │   └── lib/
│           │       ├── theme.css
│           │       └── utils.ts
│           ├── tsconfig.json
│           └── tsconfig.lib.json
├── nx.json
├── package-lock.json
├── package.json
├── tailwind.config.base.js
└── tsconfig.base.json
```
