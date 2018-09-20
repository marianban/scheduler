import { getWeekDays } from 'calendar/getWeekDays';
import { WeekNumbering } from 'calendar/WeekNumbering';
import classNames from 'classnames';
import * as addMinutes from 'date-fns/addMinutes';
import * as format from 'date-fns/format';
import * as React from 'react';
import './schedule.css';

const Schedule = () => {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0
  );
  const weekDays = [
    { name: '', day: '' },
    ...getWeekDays(WeekNumbering.ISO).map(d => ({
      name: d.threeLetterName,
      day: 1
    }))
  ];
  return (
    <div className="schedule__week">
      {weekDays.map(weekDay => (
        <div
          key={weekDay.name}
          className="schedule__week__day__name"
          style={{ gridRow: 1 }}
        >
          {weekDay.name}
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
