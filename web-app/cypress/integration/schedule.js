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
      .getByTestId('appointment-client');
  });
});
