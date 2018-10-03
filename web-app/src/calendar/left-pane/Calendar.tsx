import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { CalendarStore } from '../CalendarStore';
import Arrow from './Arrow.svg';
import './Calendar.css';
import { DateCalendar } from './DateCalendar';

interface IProps {
  calendar?: CalendarStore,
}

export const Calendar = inject('calendar')(observer((props: IProps) => {
  const calendar = props.calendar!;
  const date = calendar.date;
  const dateCalendar = new DateCalendar(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const weeks = dateCalendar.getWeeks();
  const weekDays = dateCalendar.getWeekDays().map(d => d.twoLetterName);
  return (
    <div className="calendar">
      <div className="calendar__month">
        <div>
          <Arrow style={{ transform: 'rotate(180deg)' }} onClick={calendar.prevMonth} />
        </div>
        <div className="calendar__month__title">
          {dateCalendar.getMonthName()} {dateCalendar.getYear()}
        </div>
        <div>
          <Arrow onClick={calendar!.prevMonth} />
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
}));
