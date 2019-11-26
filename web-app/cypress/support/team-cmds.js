Cypress.Commands.add(
  'teamTypeTeamMember',
  (fullName, email = '', phoneNumber = '') => {
    cy.findByLabelText(/Full Name/i)
      .type(fullName)
      .findByLabelText(/Email/i)
      .type(email)
      .findByLabelText(/Phone Number/i)
      .type(phoneNumber)
      .blur();
  }
);

Cypress.Commands.add(
  'teamExpectSelectedTeamMember',
  (fullName, email = '', phoneNumber = '') => {
    cy.findByTestId('selected-list-item').within(() => {
      cy.findByText(fullName)
        .findByText(email)
        .findByText(phoneNumber);
    });
  }
);

Cypress.Commands.add('newTeamMember', () => {
  cy.findByTestId(/new-member-btn/i)
    .click()
    .findByLabelText(/full name/i)
    .should('be.empty')
    .findByLabelText(/email/i)
    .should('be.empty')
    .findByLabelText(/phone number/i)
    .should('be.empty');
});
