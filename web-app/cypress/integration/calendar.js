import { addMonths, subMonths } from 'date-fns';

describe('calendar', () => {
  const date = new Date();
  const toCalendarTitle = date => {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  it('shows current month by default', () => {
    cy.visit('/')
      .get('.calendar__month__title')
      .should('have.text', toCalendarTitle(date));
  });
  it('highlights current date', () => {
    cy.visit('/')
      .getByText(new RegExp(`^${date.getDate()}$`))
      .should('have.class', 'calendar__day--today');
  });
  it('highlights current week', () => {
    cy.visit('/')
      .getByText(new RegExp(`^${date.getDate()}$`))
      .parent()
      .should('have.class', 'calendar__week--this');
  });
  it('selects new date if clicked', () => {
    cy.visit('/')
      .getByTestId(`day-${1}`)
      .click()
      .should('have.class', 'calendar__day--selected');
  });
  it('shows previous month if back is clicked', () => {
    const prevMonth = subMonths(date, 1);
    cy.visit('/')
      .get('.calendar__month__btn--left')
      .click()
      .get('.calendar__month__title')
      .should('have.text', toCalendarTitle(prevMonth));
  });
  it('shows next month if back is clicked', () => {
    const nextMonth = addMonths(date, 1);
    cy.visit('/')
      .get('.calendar__month__btn--right')
      .click()
      .get('.calendar__month__title')
      .should('have.text', toCalendarTitle(nextMonth));
  });
});
