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
import 'cypress-testing-library/add-commands';

Cypress.Commands.add('typeAppointment', (dateTime, fullName = '') => {
  const [date, time] = dateTime.split(' ');
  cy.getByLabelText(/date/i)
    .type(date)
    .getByLabelText(/time/i)
    .type(time)
    .blur();
  if (fullName) {
    cy.getByLabelText(/full name/i)
      .type(fullName)
      .blur();
  }
  cy.getByTestId('cancel-appointment').should('be.enabled');
});

Cypress.Commands.add('newAppointment', () => {
  cy.getByTestId(/new-appointment/i)
    .click()
    .getByLabelText(/date/i)
    .should('be.empty')
    .getByLabelText(/time/i)
    .should('be.empty')
    .getByLabelText(/full name/i)
    .should('be.empty');
});

Cypress.Commands.add('cancelSelectedAppointment', dateTime => {
  const [date, time] = dateTime.split(' ');
  cy.get(`[data-appointment="${dateTime}"]`)
    .should('exist')
    .getByTestId('cancel-appointment')
    .click()
    .getByLabelText(/date/i)
    .should('be.empty')
    .getByLabelText(/time/i)
    .should('be.empty')
    .getByLabelText(/full name/i)
    .should('be.empty')
    .getByLabelText(/email/i)
    .should('be.empty')
    .getByLabelText(/phone number/i)
    .should('be.empty')
    .getByTestId('cancel-appointment')
    .should('be.disabled')
    .getByTestId('new-appointment')
    .should('be.disabled')
    .get(`[data-appointment="${dateTime}"]`)
    .should('not.exist');
});

Cypress.Commands.add('calendarCreateAppointment', dateTime => {
  const [date, time] = dateTime.split(' ');
  cy.getByTestId(dateTime)
    .within($date => cy.getByTestId('calendar-create-appointment').click())
    .getByLabelText('Date')
    .should('have.value', date)
    .getByLabelText('Time')
    .should('have.value', time)
    .getByLabelText(/full name/i)
    .should('be.empty')
    .getByLabelText(/email/i)
    .should('be.empty')
    .getByLabelText(/phone number/i)
    .should('be.empty')
    .getByTestId('cancel-appointment')
    .should('be.enabled');
});

Cypress.Commands.add('calendarSelectAppointment', (dateTime, fullName = '') => {
  const [date, time] = dateTime.split(' ');
  cy.get(`[data-appointment="${dateTime}"]`)
    .should('exist')
    .click()
    .getByLabelText(/date/i)
    .should('have.value', date)
    .getByLabelText(/time/i)
    .should('have.value', time);

  if (fullName) {
    cy.getByLabelText(/full name/i).should('have.value', fullName);
  }
});

Cypress.Commands.add('calendarHasAppointment', (dateTime, fullName = '') => {
  const [date, time] = dateTime.split(' ');
  cy.get(`[data-appointment="${dateTime}"]`)
    .should('exist')
    .get(`[data-appointment="${dateTime}"]`)
    .within(() => {
      if (fullName) {
        cy.getByTestId('appointment-client').should('have.text', fullName);
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
  'clientsExpectSelectedClient',
  (fullName, email = '', phoneNumber = '') => {
    cy.getByTestId('selected-list-item').within(() => {
      cy.getByText(fullName)
        .getByText(email)
        .getByText(phoneNumber);
    });
  }
);

Cypress.Commands.add('newClient', () => {
  cy.getByTestId(/new-client-btn/i)
    .click()
    .getByLabelText(/full name/i)
    .should('be.empty')
    .getByLabelText(/email/i)
    .should('be.empty')
    .getByLabelText(/phone number/i)
    .should('be.empty');
});
