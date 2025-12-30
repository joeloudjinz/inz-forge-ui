## Project Folder Structure
Generated on: Tue Dec 30 11:12:11 CET 2025
*(Respected .gitignore rules)*

```text
inz-forge-ui/
├── PROJECT-CONTEXT.md
├── README.md
├── apps/
│   ├── angular-inzforge/
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
│   │   │   │   └── shared/
│   │   │   │       └── components/
│   │   │   │           ├── app-navbar/
│   │   │   │           │   └── app-navbar.component.ts
│   │   │   │           ├── app-sidebare/
│   │   │   │           │   ├── sidebar.component.css
│   │   │   │           │   ├── sidebar.component.html
│   │   │   │           │   └── sidebar.component.ts
│   │   │   │           └── page-headline/
│   │   │   │               └── page-headline.component.ts
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
│   └── reports/
│       └── integrating-tailwindcss-with-angular-app.md
├── eslint.config.mjs
├── libs/
│   ├── angular/
│   │   └── hyperui/
│   │       └── accordion/
│   │           ├── README.md
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
│   │           ├── tsconfig.json
│   │           └── tsconfig.lib.json
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
