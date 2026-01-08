// cypress/support/component.ts imports mount from cypress/angular. This legacy harness relies on zone.js to trigger
// change detection. In an Angular 21 signals-only project, this will cause cy.get() assertions to fail
// because Cypress won't know when the component has finished rendering after a signal change.
import {mount} from 'cypress/angular-zoneless';
// Import Tailwind styles so components look correct in tests
import '../../../../../../libs/shared/utils/src/lib/theme.css';
import 'cypress-real-events/support';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
