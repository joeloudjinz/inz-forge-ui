import {mount} from 'cypress/vue';
import {InzForgeHyperUiAccordionItemModel, InzForgeHyperUiAccordionModes, InzHyperUiAccordion} from '../src';

const mockItems: InzForgeHyperUiAccordionItemModel[] = [
  {title: 'Section 1', description: 'Content for section 1'},
  {title: 'Section 2', description: 'Content for section 2'},
  {title: 'Section 3', description: 'Content for section 3'}
];

const itemsWithState: InzForgeHyperUiAccordionItemModel[] = [
  {title: 'Closed', description: 'Hidden'},
  {title: 'Open', description: 'Visible', isExpandedByDefault: true}
];

describe('InzHyperUiAccordion', () => {
  // 1. Rendering & State
  describe('Rendering & Interaction', () => {
    it('renders all items with correct content', () => {
      mount(InzHyperUiAccordion, {
        props: {items: mockItems}
      });

      cy.get('details').should('have.length', 3);
      cy.contains('Section 1').should('be.visible');
      // Content should exist in DOM (details behavior) but not necessarily be visible if collapsed
      cy.contains('Content for section 1').should('exist');
    });

    it('toggles visibility on click', () => {
      mount(InzHyperUiAccordion, {
        props: {items: mockItems}
      });

      // Initially closed
      cy.get('details').first().should('not.have.attr', 'open');

      // Click summary -> Open
      cy.contains('Section 1').click();
      cy.get('details').first().should('have.attr', 'open');

      // Click summary -> Close
      cy.contains('Section 1').click();
      cy.get('details').first().should('not.have.attr', 'open');
    });

    it('respects default expanded state', () => {
      mount(InzHyperUiAccordion, {
        props: {items: itemsWithState}
      });

      cy.contains('Closed').closest('details').should('not.have.attr', 'open');
      cy.contains('Open').closest('details').should('have.attr', 'open');
    });
  });

  // 2. Accessibility & Keyboard Navigation
  describe('Keyboard Navigation', () => {
    it('manages focus with Arrow keys', () => {
      mount(InzHyperUiAccordion, {
        props: {items: mockItems}
      });

      // Focus first element
      cy.get('summary').first().focus();
      cy.get('summary').first().should('have.focus');

      // Arrow Down -> Next
      cy.focused().type('{downArrow}');
      cy.get('summary').eq(1).should('have.focus');

      // Arrow Down -> Next
      cy.focused().type('{downArrow}');
      cy.get('summary').eq(2).should('have.focus');

      // Arrow Down (at end) -> Stays at end
      cy.focused().type('{downArrow}');
      cy.get('summary').last().should('have.focus');

      // Arrow Up -> Previous
      cy.focused().type('{upArrow}');
      cy.get('summary').eq(1).should('have.focus');
    });

    it('supports Home and End keys', () => {
      mount(InzHyperUiAccordion, {
        props: {items: mockItems}
      });

      cy.get('summary').first().focus();

      // End -> Last
      cy.focused().type('{end}');
      cy.get('summary').last().should('have.focus');

      // Home -> First
      cy.focused().type('{home}');
      cy.get('summary').first().should('have.focus');
    });
  });

  // 3. Logic & Features
  describe('Modes & Features', () => {
    it('handles exclusive mode (one open at a time)', () => {
      mount(InzHyperUiAccordion, {
        props: {
          items: mockItems,
          exclusive: true
        }
      });

      // Verify 'name' attribute injection (Vue 3.5 useId check)
      cy.get('details').first().invoke('attr', 'name').should('match', /accordion-group-.+/);

      // Open First
      cy.contains('Section 1').click();
      cy.get('details').eq(0).should('have.attr', 'open');

      // Open Second -> First should close automatically (Browser native behavior via 'name' attr)
      cy.contains('Section 2').click();
      cy.get('details').eq(0).should('not.have.attr', 'open');
      cy.get('details').eq(1).should('have.attr', 'open');
    });

    it('renders with divided mode classes', () => {
      mount(InzHyperUiAccordion, {
        props: {items: mockItems, mode: InzForgeHyperUiAccordionModes.divided}
      });
      cy.get('.inz-accordion-container').should('have.class', 'divide-y');
    });

    it('renders icon classes correctly', () => {
      const items = [{
        title: 'Icon Item',
        description: '...',
        iconClass: 'fa-solid fa-home'
      }];

      mount(InzHyperUiAccordion, {props: {items}});

      cy.get('summary i').should('have.class', 'fa-solid').and('have.class', 'fa-home');
    });

    it('renders SVG component string correctly', () => {
      const items = [{
        title: 'SVG Item',
        description: '...',
        iconComponent: '<svg data-cy="custom-svg"></svg>'
      }];

      mount(InzHyperUiAccordion, {props: {items}});

      cy.get('[data-cy="custom-svg"]').should('exist');
    });
  });

  // 4. Styling & Theming (Portability Check)
  describe('Theming', () => {
    it('applies dark mode styles when class is present on container', () => {
      mount(InzHyperUiAccordion, {
        props: {items: mockItems},
        attrs: {class: 'dark'} // Simulate adding class directly to component
      });

      // Assert that CSS Variables are remapped
      // In light mode, background is #ffffff (rgb(255, 255, 255))
      // In dark mode (mocked in CSS), background is #1a202c (rgb(26, 32, 44))

      cy.get('.inz-accordion-summary').first()
        .should('have.css', 'background-color', 'rgb(26, 32, 44)');

      cy.get('.inz-accordion-summary').first()
        .should('have.css', 'color', 'rgb(226, 232, 240)'); // #e2e8f0
    });
  });
});
