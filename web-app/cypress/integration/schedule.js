describe('schedule', () => {
  it('shows new appointment in scheduler', () => {
    cy.clock(new Date(2018, 10 /*november*/, 1).getTime())
      .visit('/')
      .getByLabelText(/full name/i)
      .type('Leonard Ban')
      .getByLabelText(/date/i)
      .type('1/11/2018')
      .getByLabelText(/time/i)
      .type('10:00')
      .blur()
      .getByText('Leonard Ban');
  });

  it('does not show next week appointment in scheduler', () => {
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
});
