import { InzForgeHyperUiAccordionComponent } from '../src';

const mockItems = [
  { title: 'Item 1', description: 'Desc 1' },
  { title: 'Item 2', description: 'Desc 2' },
  { title: 'Item 3', description: 'Desc 3' }
];

describe('Accordion Component', () => {
  it('should render and toggle items', () => {
    cy.mount(InzForgeHyperUiAccordionComponent, {
      componentProperties: { items: mockItems }
    });

    // Check initial state (all closed)
    cy.get('details').should('not.have.attr', 'open');

    // Click to open
    cy.contains('Item 1').click();
    cy.get('details').first().should('have.attr', 'open');
  });

  it('should support keyboard navigation', () => {
    cy.mount(InzForgeHyperUiAccordionComponent, {
      componentProperties: { items: mockItems }
    });

    // FIX: Focus the first summary directly instead of relying on flaky 'Tab' behavior
    cy.get('summary').first().focus();
    cy.get('summary').first().should('be.focused');

    // Test Arrow Down (Custom Logic)
    cy.focused().type('{downArrow}');
    cy.get('summary').eq(1).should('be.focused');

    // Test Arrow Up (Custom Logic)
    cy.focused().type('{upArrow}');
    cy.get('summary').first().should('be.focused');

    // Test End Key (Custom Logic)
    cy.focused().type('{end}');
    cy.get('summary').last().should('be.focused');

    // Test Home Key (Custom Logic)
    cy.focused().type('{home}');
    cy.get('summary').first().should('be.focused');
  });

  it('should handle exclusive mode', () => {
    cy.mount(InzForgeHyperUiAccordionComponent, {
      componentProperties: {
        items: mockItems,
        exclusive: true
      }
    });

    // Open first
    cy.contains('Item 1').click();
    cy.get('details').eq(0).should('have.attr', 'open');

    // Open second (should close first)
    cy.contains('Item 2').click();
    cy.get('details').eq(0).should('not.have.attr', 'open');
    cy.get('details').eq(1).should('have.attr', 'open');
  });
});
