import classNames from 'classnames';
import * as React from 'react';
import Arrow from './Arrow.svg';
import { DateCalendar } from './DateCalendar';

export const Calendar = () => {
  const date = new Date();
  const calendar = new DateCalendar(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const weeks = calendar.getWeeks();
  const weekDays = calendar.getWeekDays();
  return (
    <div className="calendar">
      <div className="calendar__month">
        <div>
          <Arrow style={{ transform: 'rotate(180deg)' }} />
        </div>
        <div className="calendar__month__title">
          {calendar.getMonthName()} {calendar.getYear()}
        </div>
        <div>
          <Arrow />
        </div>
      </div>
      <div className="calendar__weeks">
        <div className="calendar__week">
          {weekDays.map(weekDay => (
            <div className="calendar__week__name">{weekDay}</div>
          ))}
        </div>
        {weeks.map(week => (
          <div
            className={classNames('calendar__week', {
              'calendar__week--current': week.includes(date)
            })}
          >
            <div className="calendar__week__num">{week.num}</div>
            {week.days.map(day => (
              <div
                className={classNames('calendar__week__day', {
                  'calendar__day--today': day.isSameDayAs(date),
                  'calendar__day--another-month': !day.isActiveMonth
                })}
              >
                {day.num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};