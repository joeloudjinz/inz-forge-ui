import { mount } from 'cypress/angular';
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
