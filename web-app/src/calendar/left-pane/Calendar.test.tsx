import { fireEvent } from '@testing-library/react';
import { addMonths, subMonths } from 'date-fns';
import React from 'react';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import { Calendar } from './Calendar';

const toCalendarTitle = (d: Date) => {
  const month = d.toLocaleString('en-US', { month: 'long' });
  const year = d.getFullYear();
  return `${month} ${year}`;
};

const date = new Date();

const renderCalendar = () => {
  const rootStore = new RootStore(date);
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
    monthTitle,
    getDay: (month: number, day: number) => getByTestId(`day-${day}-${month}`)
  };
};

describe('calendar', () => {
  it('shows current month by default', () => {
    const { monthTitle } = renderCalendar();
    expect(monthTitle).toHaveTextContent(toCalendarTitle(date));
  });
  it('highlights current day', () => {
    const { getDay } = renderCalendar();
    const day = getDay(date.getMonth(), date.getDate());
    expect(day).toHaveClass('calendar__day--today');
  });
  it.only('highlights current week', () => {
    const { getDay } = renderCalendar();
    const day = getDay(date.getMonth(), date.getDate());
    expect(day.parentElement).toHaveClass('calendar__week--this');
  });
  it('highlights selected date', () => {
    const { getDay } = renderCalendar();
    const day = getDay(date.getMonth(), 1);
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
