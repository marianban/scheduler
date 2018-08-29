import * as classNames from 'classnames';
import { addDays, getDay, getDaysInMonth, getISOWeek } from 'date-fns';
import * as React from 'react';
import './calendar.css';

const range = (count: number, start: number = 1) =>
  Array.from({ length: count }, (v, i) => start + i);

const LeftPane = () => {
  const date = new Date();
  const firstDayInMonth = new Date(date.getFullYear(), date.getMonth());
  const firstWeekInMonth = getISOWeek(firstDayInMonth);
  const numberOfWeeks = 5;
  return (
    <aside className="app__left-pane">
      <div className="calendar">
        <div className="calendar__month">
          <div>&lt;</div>
          <div className="calendar__month__title">August 2018</div>
          <div>&gt;</div>
        </div>
        <div className="calendar__weeks">
          <div className="calendar__week" />
          {range(numberOfWeeks, firstWeekInMonth).map((week: number) => (
            <div className="calendar__week" key={week}>
              {week}
            </div>
          ))}
        </div>
        <div className="calendar__days">
          {['Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa', 'Su'].map((dayName: string) => (
            <div className="calendar__day__name">{dayName}</div>
          ))}
          {range(getDaysInMonth(firstDayInMonth)).map((day: number) => (
            <div
              className={classNames('calendar__day', {
                'calendar__day--today': date.getDate() === day
              })}
              key={day}
              style={{ gridColumn: getDay(addDays(firstDayInMonth, day - 1)) }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftPane;
