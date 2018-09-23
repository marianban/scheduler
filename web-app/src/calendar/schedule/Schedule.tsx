import { getWeekDays } from 'calendar/getWeekDays';
import { WeekNumbering } from 'calendar/WeekNumbering';
import classNames from 'classnames';
import * as addDays from 'date-fns/addDays';
import * as addMinutes from 'date-fns/addMinutes';
import * as format from 'date-fns/format';
import * as getStartOfWeek from 'date-fns/startOfWeek'
import * as React from 'react';
import './Schedule.css';

export const Schedule = () => {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0
  );

  const startOfWeek = getStartOfWeek(now, { weekStartsOn: 1 })
  
  const weekDays = [
    { name: '', day: '' },
    ...getWeekDays(WeekNumbering.ISO).map((d, i) => ({
      name: d.threeLetterName,
      day: addDays(startOfWeek, i).getDate()
    }))
  ];
  return (
    <div className="schedule__week">
      {weekDays.map((weekDay, i) => (
        <div
          key={weekDay.name}
          className={classNames('schedule__week__day__name', {
            'schedule__week__day__name--selected': i === 4
          })}
          style={{ gridRow: 1 }}
        >
          <div className="day__name">{weekDay.name}</div>
          <div className="day__number">{weekDay.day}</div>
        </div>
      ))}
      {Array.from({ length: 16 * 8 }).map((v, i) => (
        <div
          key={i}
          className={classNames('schedule__week__day', {
            'schedule__week__day--last': (i + 1) % 8 === 0,
            schedule__week__hour: (i + 1) % 8 === 1
          })}
          style={{
            gridColumn: (i + 1) % 8,
            gridRow: Math.ceil((i + 1) / 8) + 1
          }}
        >
          {(i + 1) % 8 === 1 && (
            <span>
              {format(addMinutes(startOfDay, 30 * Math.ceil(i / 8)), 'H:mm')}
            </span>
          )}
        </div>
      ))}
      <div className="apointment">Appointment</div>
    </div>
  );
};

export default Schedule;
