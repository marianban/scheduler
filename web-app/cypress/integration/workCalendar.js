describe('work calendar', () => {
  const WORK_CALENDAR_URL = '/';
  const date = new Date(2018, 10 /*november*/, 1).getTime();

  it('shows new appointments in work calendar', () => {
    cy.clock(date)
      .visit(WORK_CALENDAR_URL)
      .typeAppointment('1/11/2018 10:00', 'Leonard Ban')
      .calendarAppointmentsCount(1)
      .calendarHasAppointment('1/11/2018 10:00', 'Leonard Ban')
      .newAppointment()
      .typeAppointment('2/11/2018 11:00', 'Marian Ban')
      .calendarAppointmentsCount(2)
      .calendarHasAppointment('2/11/2018 11:00', 'Marian Ban');
  });

  it('does not show next week appointment in work calendar', () => {
    cy.clock(date)
      .visit(WORK_CALENDAR_URL)
      .typeAppointment('25/12/2018 13:00', 'Leonard Ban')
      .calendarAppointmentsCount(0);
  });

  it('can navigate between appointments', () => {
    cy.clock(date)
      .visit(WORK_CALENDAR_URL)
      .typeAppointment('1/11/2018 10:00', 'Leonard Ban')
      .newAppointment()
      .typeAppointment('2/11/2018 11:00', 'Marian Ban')
      .calendarAppointmentsCount(2)
      .calendarSelectAppointment('1/11/2018 10:00', 'Leonard Ban');
  });

  it('should show only actual appointments', () => {
    cy.clock(date)
      .visit(WORK_CALENDAR_URL)
      .typeAppointment('20/11/2018 10:00')
      .calendarAppointmentsCount(0);
  });

  it('can create new appointment', () => {
    cy.clock(date)
      .visit(WORK_CALENDAR_URL)
      .calendarCreateAppointment('3/11/2018 11:30')
      .calendarCreateAppointment('2/11/2018 13:30')
      .calendarAppointmentsCount(2)
      .cancelSelectedAppointment('2/11/2018 13:30')
      .calendarSelectAppointment('3/11/2018 11:30')
      .cancelSelectedAppointment('3/11/2018 11:30');
  });
});
