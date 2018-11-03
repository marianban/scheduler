import { getByTestId } from 'dom-testing-library';
import * as React from 'react';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import {
  getAppointmentPosition,
  getStartOfWorkDay,
  Schedule
} from './Schedule';

const renderSchedule = (rootStore: RootStore) => {
  return {
    ...renderWithProviders(<Schedule rootStore={rootStore} />, rootStore),
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
    time: '10:00'
  });
  const { getAllByTestId }: any = renderSchedule(rootStore);
  const appointments = getAllByTestId('appointment');
  expect(appointments).toHaveLength(1);
});

it.each`
  date                     | row  | column
  ${'2018-10-29T08:00:00'} | ${2} | ${2}
  ${'2018-10-29T08:30:00'} | ${3} | ${2}
  ${'2018-10-29T08:31:00'} | ${3} | ${2}
  ${'2018-10-29T08:59:00'} | ${3} | ${2}
  ${'2018-10-29T09:00:00'} | ${4} | ${2}
  ${'2018-10-30T08:00:00'} | ${2} | ${3}
  ${'2018-11-01T08:00:00'} | ${2} | ${5}
`('for $date returns row: $row, column: $column', ({ date, row, column }) => {
  const jsDate = new Date(date);
  const result = getAppointmentPosition(getStartOfWorkDay(jsDate), jsDate);
  expect(result.row).toBe(row);
  expect(result.column).toBe(column);
});
