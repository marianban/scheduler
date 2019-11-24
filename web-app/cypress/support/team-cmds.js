import 'cypress-testing-library/add-commands';

Cypress.Commands.add(
  'teamTypeTeamMember',
  (fullName, email = '', phoneNumber = '') => {
    cy.getByLabelText(/Full Name/i)
      .type(fullName)
      .getByLabelText(/Email/i)
      .type(email)
      .getByLabelText(/Phone Number/i)
      .type(phoneNumber)
      .blur();
  }
);

Cypress.Commands.add(
  'teamExpectSelectedTeamMember',
  (fullName, email = '', phoneNumber = '') => {
    cy.getByTestId('selected-list-item').within(() => {
      cy.getByText(fullName)
        .getByText(email)
        .getByText(phoneNumber);
    });
  }
);

Cypress.Commands.add('newTeamMember', () => {
  cy.getByTestId(/new-member-btn/i)
    .click()
    .getByLabelText(/full name/i)
    .should('be.empty')
    .getByLabelText(/email/i)
    .should('be.empty')
    .getByLabelText(/phone number/i)
    .should('be.empty');
});
