# InzForge HyperUI Components

[![Unit Tests](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular.hyperui.unit-tests.yml/badge.svg)](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular.hyperui.unit-tests.yml)
[![Component Tests](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular.hyperui.component-tests.yml/badge.svg)](https://github.com/joeloudjinz/inz-forge-ui/actions/workflows/angular.hyperui.component-tests.yml)

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
