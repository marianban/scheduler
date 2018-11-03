import { getWeekDays } from 'calendar/getWeekDays';
import { WeekNumbering } from 'calendar/WeekNumbering';
import classNames from 'classnames';
import * as addDays from 'date-fns/addDays/index';
import * as addMinutes from 'date-fns/addMinutes/index';
import * as differenceInMinutes from 'date-fns/differenceInMinutes/index';
import * as format from 'date-fns/format/index';
import * as isSameWeek from 'date-fns/isSameWeek/index';
import * as getStartOfWeek from 'date-fns/startOfWeek/index';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RootStore } from 'RootStore';
import './Schedule.css';

interface IScheduleProps {
  rootStore?: RootStore;
}

export const getAppointmentPosition = (
  startOfWorkDay: Date,
  appointmentDate: Date
) => {
  return {
    column: appointmentDate.getDay() + 1,
    row:
      Math.floor(differenceInMinutes(appointmentDate, startOfWorkDay) / 30) + 2
  };
};

export const getStartOfWorkDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0);

@inject('rootStore')
@observer
export class Schedule extends React.Component<IScheduleProps, {}> {
  public render() {
    const rootStore = this.props.rootStore!;
    const { dateSelectionModel, appointmentsModel } = rootStore;
    const { selectedDate } = dateSelectionModel;
    const startOfDay = getStartOfWorkDay(selectedDate);
    const startOfWeek = getStartOfWeek(selectedDate, { weekStartsOn: 1 });

    return (
      <div className="schedule__week">
        {this.renderHeader(startOfWeek, selectedDate)}
        {this.renderGrid(startOfDay)}
        {appointmentsModel.appointments
          .filter(appointment => isSameWeek(appointment.dateTime, selectedDate))
          .map(appointment => {
            const position = getAppointmentPosition(
              startOfDay,
              appointment.dateTime
            );
            return (
              <div
                className="appointment"
                data-testid="appointment"
                key={appointment.id}
                data-position={`${position.row - position.column}`}
                style={{
                  gridRow: `${position.row} / span 3`,
                  gridColumn: `${position.column} / span 1`
                }}
              >
                <span data-testid="appointment-client">
                  {appointment.getClientFullName(rootStore)}
                </span>
              </div>
            );
          })}
      </div>
    );
  }

  private renderHeader = (startOfWeek: Date, selectedDate: Date) => {
    const weekDays = [
      { name: '', day: '' },
      ...getWeekDays(WeekNumbering.ISO).map((d, i) => ({
        name: d.threeLetterName,
        day: addDays(startOfWeek, i).getDate()
      }))
    ];

    return weekDays.map((weekDay, i) => (
      <div
        key={weekDay.name}
        className={classNames('schedule__week__day__name', {
          'schedule__week__day__name--selected': i === selectedDate.getDay()
        })}
        style={{ gridRow: 1 }}
        data-testid="week-day-name"
      >
        <div className="day__name" data-testid="day-name">
          {weekDay.name}
        </div>
        <div className="day__number" data-testid="day-number">
          {weekDay.day}
        </div>
      </div>
    ));
  };

  private renderGrid = (startOfDay: Date) => {
    return Array.from({ length: 16 * 8 }).map((v, i) => (
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
    ));
  };
}
