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
  return (
    <div className="schedule__week">

      {Array.from({ length: 16 * 8 }).map((v, i) => (
        <div
          key={i}
          className={classNames({
            'schedule__week__day--last': (i + 1) % 8 === 0,
            schedule__week__hour: (i + 1) % 8 === 1
          })}
          style={{
            gridColumn: (i + 1) % 8,
            gridRow: Math.ceil((i + 1) / 8)
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
