import {provideRouter} from '@angular/router';
import {
  InzForgeHyperUiSideMenuComponent,
  InzForgeHyperUiSideMenuItem,
  InzForgeHyperUiSideMenuLogo,
  InzForgeHyperUiSideMenuModes,
  InzForgeHyperUiSideMenuProfile
} from '../src';

describe('InzForgeHyperUiSideMenuComponent', () => {
  const mockLogo: InzForgeHyperUiSideMenuLogo = {
    text: 'ForgeUI',
    initials: 'FU',
    subtitle: 'Admin Dashboard',
  };

  const mockProfile: InzForgeHyperUiSideMenuProfile = {
    headline: 'Jane Doe',
    subtitle: 'Admin',
    avatarUrl: 'https://i.pravatar.cc/150',
    profileRoute: '/profile',
  };

  const mockItems: InzForgeHyperUiSideMenuItem[] = [
    {label: 'Dashboard', route: '/dashboard', iconClass: 'fa fa-home'},
    {
      label: 'Settings',
      iconClass: 'fa fa-cog',
      children: [
        {label: 'General', route: '/settings/general'},
        {label: 'Security', route: '/settings/security'},
      ],
      isExpandedByDefault: true,
    },
  ];

  const mockFooterItems: InzForgeHyperUiSideMenuItem[] = [
    {label: 'Logout', route: '/logout', iconClass: 'fa fa-sign-out'},
  ];

  // a helper for standard mounting config
  const mountConfig = {
    providers: [
      provideRouter([]),
    ],
  };

  it('renders in Standard Mode (w-64) by default', () => {
    cy.mount(InzForgeHyperUiSideMenuComponent, {
      ...mountConfig,
      componentProperties: {
        items: mockItems,
        logo: mockLogo,
        profile: mockProfile,
      },
    });

    cy.get('.side-menu-root')
      .should('have.class', 'w-64')
      .and('not.have.class', 'w-16');

    cy.get('.side-menu-text-main').should('contain.text', 'ForgeUI');
    cy.contains(mockProfile.headline).should('be.visible');
  });

  it('renders in Compact Mode (w-16)', () => {
    cy.mount(InzForgeHyperUiSideMenuComponent, {
      ...mountConfig,
      componentProperties: {
        items: mockItems,
        logo: mockLogo,
        mode: InzForgeHyperUiSideMenuModes.compact,
      },
    });

    cy.get('.side-menu-root')
      .should('have.class', 'w-16')
      .and('not.have.class', 'w-64');

    cy.get('.side-menu-text-main').should('contain.text', 'FU');

    // Check specific implementation of hidden text in compact mode
    cy.contains('span', 'Dashboard')
      .should('have.class', 'invisible');
  });

  it('handles Accordion/Group behavior in Standard Mode', () => {
    const collapsedItems: InzForgeHyperUiSideMenuItem[] = [
      {
        label: 'Reports',
        children: [{label: 'Q1 Report', route: '/q1'}],
        isExpandedByDefault: false,
      },
    ];

    cy.mount(InzForgeHyperUiSideMenuComponent, {
      ...mountConfig,
      componentProperties: {
        items: collapsedItems,
      },
    });

    // Validate Initial State: Details should be CLOSED (no open attribute)
    // rely on the DOM attribute 'open' as the source of truth for logic
    cy.get('details').should('not.have.attr', 'open');

    // Action: Click Summary
    cy.get('summary').click();

    // Validate End State: Details should be OPEN
    cy.get('details').should('have.attr', 'open');

    // Now that it is open, the child should definitely be visible
    cy.contains('Q1 Report').should('be.visible');
  });

  it('flattens groups in Compact Mode (Parent Label Removed)', () => {
    cy.mount(InzForgeHyperUiSideMenuComponent, {
      ...mountConfig,
      componentProperties: {
        items: mockItems,
        mode: InzForgeHyperUiSideMenuModes.compact,
      },
    });

    // Parent group container/details should not exist
    cy.get('details').should('not.exist');

    // Parent label "Settings" is not rendered in this compact implementation
    cy.contains('span', 'Settings').should('not.exist');

    // Child items are promoted to top level (rendered as icons/links)
    cy.contains('span', 'General').should('exist');
  });

  it('renders footer items when provided', () => {
    cy.mount(InzForgeHyperUiSideMenuComponent, {
      ...mountConfig,
      componentProperties: {
        items: [],
        footerItems: mockFooterItems,
      },
    });

    cy.get('.mt-auto').within(() => {
      cy.contains('Logout').should('exist');
    });
  });

  it('reacts to input changes (Signal Reactivity)', () => {
    // Mount with Standard Mode
    cy.mount(InzForgeHyperUiSideMenuComponent, {
      ...mountConfig,
      componentProperties: {
        items: mockItems,
        mode: InzForgeHyperUiSideMenuModes.standard,
      },
    }).then((wrapper) => {
      cy.get('.side-menu-root').should('have.class', 'w-64');

      cy.wrap(null).then(() => {
        wrapper.fixture.componentRef.setInput('mode', InzForgeHyperUiSideMenuModes.compact);
        wrapper.fixture.detectChanges();
      });

      cy.get('.side-menu-root').should('have.class', 'w-16');
    });
  });
});
