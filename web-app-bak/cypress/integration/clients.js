describe('calendar', () => {
  it('renders newly created client as selected', () => {
    cy.visit('/clients')
      .clientsTypeClient('Leonard Ban', 'leo@gmail.com', '0908042407')
      .clientsExpectSelectedClient('Leonard Ban', 'leo@gmail.com', '0908042407')
      .getByTestId('new-client-btn')
      .click()
      .clientsTypeClient('Marian Ban', 'marian.ban@gmail.com', '0908000123')
      .clientsExpectSelectedClient(
        'Marian Ban',
        'marian.ban@gmail.com',
        '0908000123'
      );
  });
});
