import { mount } from 'cypress/vue';
import { InzHyperUiAccordion, InzForgeHyperUiAccordionItemModel, InzForgeHyperUiAccordionModes } from '../src';

const mockItems: InzForgeHyperUiAccordionItemModel[] = [
  { title: 'Item 1', description: 'Description 1' },
  { title: 'Item 2', description: 'Description 2' },
  { title: 'Item 3', description: 'Description 3' }
];

describe('Accordion Component', () => {
  it('should render and toggle items', () => {
    mount(InzHyperUiAccordion, {
      props: { items: mockItems }
    });

    // Check initial state (all closed)
    cy.get('details').should('not.have.attr', 'open');

    // Click to open
    cy.contains('Item 1').click();
    cy.get('details').first().should('have.attr', 'open');
  });

  it('should support keyboard navigation', () => {
    mount(InzHyperUiAccordion, {
      props: { items: mockItems }
    });

    // Focus the first summary
    cy.get('summary').first().focus();
    cy.get('summary').first().should('be.focused');

    // Test Arrow Down
    cy.focused().type('{downArrow}');
    cy.get('summary').eq(1).should('be.focused');

    // Test Arrow Up
    cy.focused().type('{upArrow}');
    cy.get('summary').first().should('be.focused');

    // Test End Key
    cy.focused().type('{end}');
    cy.get('summary').last().should('be.focused');

    // Test Home Key
    cy.focused().type('{home}');
    cy.get('summary').first().should('be.focused');
  });

  it('should support different modes', () => {
    mount(InzHyperUiAccordion, {
      props: {
        items: mockItems,
        mode: InzForgeHyperUiAccordionModes.divided
      }
    });

    cy.get('.inz-accordion-container').should('have.class', 'divide-y');
  });

  it('should handle exclusive mode', () => {
    mount(InzHyperUiAccordion, {
      props: {
        items: mockItems,
        exclusive: true
      }
    });

    // Open first item
    cy.get('summary').first().click();
    cy.get('details').first().should('have.attr', 'open');

    // Open second item - first should close
    cy.get('summary').eq(1).click();
    cy.get('details').first().should('not.have.attr', 'open');
    cy.get('details').eq(1).should('have.attr', 'open');
  });

  it('should render icons when provided', () => {
    const itemsWithIcons: InzForgeHyperUiAccordionItemModel[] = [
      {
        title: 'Item with icon class',
        description: 'Description with icon',
        iconClass: 'test-icon-class'
      }
    ];

    mount(InzHyperUiAccordion, {
      props: { items: itemsWithIcons }
    });

    cy.get('i.test-icon-class').should('exist');
  });
});
