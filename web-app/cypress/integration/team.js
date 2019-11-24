describe('team', () => {
  it('renders newly created team members as selected', () => {
    cy.visit('/team')
      .teamTypeTeamMember('Leonard Ban', 'leo@gmail.com', '0908042407')
      .teamExpectSelectedTeamMember(
        'Leonard Ban',
        'leo@gmail.com',
        '0908042407'
      )
      .newTeamMember()
      .teamTypeTeamMember('Marian Ban', 'marian.ban@gmail.com', '0908000123')
      .teamExpectSelectedTeamMember(
        'Marian Ban',
        'marian.ban@gmail.com',
        '0908000123'
      );
  });
  it('renders newly created team members at the top of the list', () => {
    cy.visit('/team')
      .teamTypeTeamMember('Marian Ban', 'marian.ban@gmail.com', '0908042407')
      .newTeamMember()
      .teamTypeTeamMember('Leonard Ban', 'leo@gmail.com', '0908042407')
      .get('.list-view__item:first .client-full-name')
      .contains('Leonard Ban');
  });
});
