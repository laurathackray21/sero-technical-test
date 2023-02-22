Cypress.Commands.add('getById', (id: string) => { 
    return cy.get(`[data-test-id="${id}"]`);
});
