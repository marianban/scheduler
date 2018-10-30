import { addMonths, subMonths } from 'date-fns';
import * as React from 'react';
import { fireEvent } from 'react-testing-library';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import { Calendar } from './Calendar';

const toCalendarTitle = (date: Date) => {
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const renderCalendar = () => {
  const rootStore = new RootStore(new Date());
  const result = renderWithProviders(<Calendar rootStore={rootStore} />);
  const { getByTestId } = result;
  const prevBtn = getByTestId(/btn-prev/i);
  const nextBtn = getByTestId(/btn-next/i);
  const monthTitle = getByTestId(/month-title/i);
  return {
    ...result,
    rootStore,
    prevBtn,
    nextBtn,
    monthTitle
  };
};

const date = new Date();

describe('calendar', () => {
  it('shows current month by default', () => {
    const { monthTitle } = renderCalendar();
    expect(monthTitle).toHaveTextContent(toCalendarTitle(date));
  });
  it('highlights current date', () => {
    const { getByText } = renderCalendar();
    const day = getByText(new RegExp(`^${date.getDate()}$`));
    expect(day).toHaveClass('calendar__day--today');
  });
  it('highlights current date', () => {
    const { getByText } = renderCalendar();
    const day = getByText(new RegExp(`^${date.getDate()}$`));
    expect(day.parentElement).toHaveClass('calendar__week--this');
  });
  it('highlights current date', () => {
    const { getByText } = renderCalendar();
    const day = getByText(new RegExp(`^1$`));
    fireEvent.click(day);
    expect(day).toHaveClass('calendar__day--selected');
  });
  it('shows previous month if back is clicked', () => {
    const prevMonth = subMonths(date, 1);
    const { prevBtn, monthTitle } = renderCalendar();
    fireEvent.click(prevBtn);
    expect(monthTitle).toHaveTextContent(toCalendarTitle(prevMonth));
  });
  it('shows next month if back is clicked', () => {
    const nextMonth = addMonths(date, 1);
    const { nextBtn, monthTitle } = renderCalendar();
    fireEvent.click(nextBtn);
    expect(monthTitle).toHaveTextContent(toCalendarTitle(nextMonth));
  });
});
