// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('typeAppointment', (dateTime, fullName = '') => {
  const [date, time] = dateTime.split(' ');
  cy.findByLabelText(/date/i)
    .type(date)
    .findByLabelText(/time/i)
    .type(time)
    .blur();
  if (fullName) {
    cy.findByLabelText(/full name/i)
      .type(fullName)
      .blur();
  }
  cy.findByTestId('cancel-appointment').should('be.enabled');
});

Cypress.Commands.add('newAppointment', () => {
  cy.findByTestId(/new-appointment/i)
    .click()
    .findByLabelText(/date/i)
    .should('be.empty')
    .findByLabelText(/time/i)
    .should('be.empty')
    .findByLabelText(/full name/i)
    .should('be.empty');
});

Cypress.Commands.add('cancelSelectedAppointment', dateTime => {
  const [date, time] = dateTime.split(' ');
  cy.get(`[data-appointment="${dateTime}"]`)
    .should('exist')
    .findByTestId('cancel-appointment')
    .click()
    .findByLabelText(/date/i)
    .should('be.empty')
    .findByLabelText(/time/i)
    .should('be.empty')
    .findByLabelText(/full name/i)
    .should('be.empty')
    .findByLabelText(/email/i)
    .should('be.empty')
    .findByLabelText(/phone number/i)
    .should('be.empty')
    .findByTestId('cancel-appointment')
    .should('be.disabled')
    .findByTestId('new-appointment')
    .should('be.disabled')
    .get(`[data-appointment="${dateTime}"]`)
    .should('not.exist');
});

Cypress.Commands.add('calendarCreateAppointment', dateTime => {
  const [date, time] = dateTime.split(' ');
  cy.findByTestId(dateTime)
    .within($date => cy.findByTestId('calendar-create-appointment').click())
    .findByLabelText('Date')
    .should('have.value', date)
    .findByLabelText('Time')
    .should('have.value', time)
    .findByLabelText(/full name/i)
    .should('be.empty')
    .findByLabelText(/email/i)
    .should('be.empty')
    .findByLabelText(/phone number/i)
    .should('be.empty')
    .findByTestId('cancel-appointment')
    .should('be.enabled');
});

Cypress.Commands.add('calendarSelectAppointment', (dateTime, fullName = '') => {
  const [date, time] = dateTime.split(' ');
  cy.get(`[data-appointment="${dateTime}"]`)
    .should('exist')
    .click()
    .findByLabelText(/date/i)
    .should('have.value', date)
    .findByLabelText(/time/i)
    .should('have.value', time);

  if (fullName) {
    cy.findByLabelText(/full name/i).should('have.value', fullName);
  }
});

Cypress.Commands.add('calendarHasAppointment', (dateTime, fullName = '') => {
  const [date, time] = dateTime.split(' ');
  cy.get(`[data-appointment="${dateTime}"]`)
    .should('exist')
    .get(`[data-appointment="${dateTime}"]`)
    .within(() => {
      if (fullName) {
        cy.findByTestId('appointment-client').should('have.text', fullName);
      }
    });
});

Cypress.Commands.add('calendarAppointmentsCount', count => {
  count
    ? cy
        .get('[data-testid=appointment]')
        .its('length')
        .should('eq', count)
    : cy.get('[data-testid=appointment]').should('not.exist');
});

Cypress.Commands.add(
  'clientsTypeClient',
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
  'clientsExpectSelectedClient',
  (fullName, email = '', phoneNumber = '') => {
    cy.findByTestId('selected-list-item').within(() => {
      cy.findByText(fullName)
        .findByText(email)
        .findByText(phoneNumber);
    });
  }
);

Cypress.Commands.add('newClient', () => {
  cy.findByTestId(/new-client-btn/i)
    .click()
    .findByLabelText(/full name/i)
    .should('be.empty')
    .findByLabelText(/email/i)
    .should('be.empty')
    .findByLabelText(/phone number/i)
    .should('be.empty');
});
