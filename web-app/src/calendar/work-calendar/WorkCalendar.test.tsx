import { getByTestId } from 'dom-testing-library';
import React from 'react';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import { getAppointmentPosition } from './CalendarAppointment';
import { getStartOfWorkDay, WorkCalendar } from './WorkCalendar';

const renderSchedule = (rootStore: RootStore) => {
  return {
    ...renderWithProviders(<WorkCalendar rootStore={rootStore} />, rootStore),
    rootStore
  };
};

it('renders a week for selected date', () => {
  const rootStore = new RootStore(new Date());
  rootStore.dateSelectionModel.set(new Date(2018, 10, 22));
  const { getAllByTestId }: any = renderSchedule(rootStore);
  const dayNumbers = getAllByTestId('week-day-name')
    .slice(1)
    .map((e: HTMLElement) => ({
      name: getByTestId(e, 'day-name').textContent,
      number: getByTestId(e, 'day-number').textContent
    }));
  expect(dayNumbers).toHaveLength(7);
  expect(dayNumbers).toMatchSnapshot();
});

it('renders new appointment on an appropriate place', () => {
  const rootStore = new RootStore(new Date());
  rootStore.dateSelectionModel.set(new Date(2018, 10, 22));
  rootStore.appointmentsModel.create({
    date: '20/11/2018',
    time: '10:00',
    duration: 30
  });
  const { getAllByTestId }: any = renderSchedule(rootStore);
  const appointments = getAllByTestId('appointment');
  expect(appointments).toHaveLength(1);
});

it.each`
  date                     | duration | row  | column | rowSpan
  ${'2018-10-29T08:00:00'} | ${30}    | ${2} | ${2}   | ${1}
  ${'2018-10-29T08:30:00'} | ${60}    | ${3} | ${2}   | ${2}
  ${'2018-10-29T08:31:00'} | ${90}    | ${3} | ${2}   | ${3}
  ${'2018-10-29T08:59:00'} | ${30}    | ${3} | ${2}   | ${1}
  ${'2018-10-29T09:00:00'} | ${30}    | ${4} | ${2}   | ${1}
  ${'2018-10-30T08:00:00'} | ${30}    | ${2} | ${3}   | ${1}
  ${'2018-11-02T11:00:00'} | ${30}    | ${8} | ${6}   | ${1}
  ${'2018-11-01T08:00:00'} | ${30}    | ${2} | ${5}   | ${1}
  ${'2018-11-11T08:00:00'} | ${30}    | ${2} | ${8}   | ${1}
`(
  'for $date, $duration returns row: $row, column: $column, rowSpan: $rowSpan',
  ({ date, duration, row, column, rowSpan }) => {
    const jsDate = new Date(date);
    const result = getAppointmentPosition(
      getStartOfWorkDay(jsDate),
      jsDate,
      duration
    );
    expect(result.row).toBe(row);
    expect(result.column).toBe(column);
    expect(result.rowSpan).toBe(rowSpan);
  }
);
