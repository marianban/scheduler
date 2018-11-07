describe('work calendar', () => {
  it('shows new appointments in work calendar', () => {
    cy.clock(new Date(2018, 10 /*november*/, 1).getTime())
      .visit('/')
      .getByLabelText(/full name/i)
      .type('Leonard Ban')
      .getByLabelText(/date/i)
      .type('1/11/2018')
      .getByLabelText(/time/i)
      .type('10:00')
      .blur()
      .getByText('Leonard Ban')
      .parent('[data-testid="appointment"]')
      .should('have.attr', 'data-position', '6-5-1')
      .getByTestId(/new-appointment/i)
      .click()
      .getByLabelText(/full name/i)
      .clear()
      .type('Marian Ban')
      .getByLabelText(/date/i)
      .clear()
      .type('2/11/2018')
      .getByLabelText(/time/i)
      .clear()
      .type('11:00')
      .blur()
      .getByText('Marian Ban')
      .parent('[data-testid="appointment"]')
      .should('have.attr', 'data-position', '8-6-1')
      .getByText('Leonard Ban');
  });

  it('does not show next week appointment in work calendar', () => {
    cy.clock(new Date(2018, 10 /*november*/, 1).getTime())
      .visit('/')
      .getByLabelText(/full name/i)
      .type('Leonard Ban')
      .getByLabelText(/date/i)
      .type('25/12/2018')
      .getByLabelText(/time/i)
      .type('13:00')
      .blur()
      .get('[data-testid=appointment]')
      .should('not.exist');
  });

  it('can navigate between appointments', () => {
    cy.clock(new Date(2018, 10 /*november*/, 1).getTime())
      .visit('/')
      .getByLabelText(/full name/i)
      .type('Leonard Ban')
      .getByLabelText(/date/i)
      .type('1/11/2018')
      .getByLabelText(/time/i)
      .type('10:00')
      .blur()
      .getByTestId(/new-appointment/i)
      .click()
      .getByLabelText(/full name/i)
      .clear()
      .type('Marian Ban')
      .getByLabelText(/date/i)
      .clear()
      .type('2/11/2018')
      .getByLabelText(/time/i)
      .clear()
      .type('11:00')
      .blur()
      .getByText('Leonard Ban')
      .click()
      .getByLabelText(/full name/i)
      .should('have.value', 'Leonard Ban');
  });

  it('should show only actual appointments', () => {
    cy.clock(new Date(2018, 10 /*november*/, 1).getTime())
      .visit('/')
      .getByLabelText(/full name/i)
      .type('Leonard Ban')
      .getByLabelText(/date/i)
      .type('20/11/2018')
      .getByLabelText(/time/i)
      .type('10:00')
      .blur()
      .get('[data-testid=appointment]')
      .should('not.exist');
  });
});
