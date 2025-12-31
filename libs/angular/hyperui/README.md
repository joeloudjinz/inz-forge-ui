# InzForge HyperUI Components

[![Unit Tests](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular/hyperui/unit-test.yml/badge.svg)](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular/hyperui/unit-test.yml)
[![Component Tests](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular/hyperui/component-test.yml/badge.svg)](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular/hyperui/component-test.yml)

A collection of Angular components based on the HyperUI design system.

## Components

- [Accordion](./accordion/README.md) - An accordion component with multiple styles and configurations

## Running Tests

### Unit Tests
To run unit tests for all HyperUI components:
```bash
npx nx run-many --target=test --projects="libs/angular/hyperui/*"
```

To run unit tests for a specific component:
```bash
npx nx test <component-name>
# Example:
npx nx test accordion
```

### Component Tests
To run component tests for all HyperUI components:
```bash
npx nx run-many --target=component-test --projects="libs/angular/hyperui/*"
```

To run component tests for a specific component:
```bash
npx nx component-test <component-name>
# Example:
npx nx component-test accordion
```

### Linting
To lint all HyperUI components:
```bash
npx nx run-many --target=lint --projects="libs/angular/hyperui/*"
```

To lint a specific component:
```bash
npx nx lint <component-name>
# Example:
npx nx lint accordion
```