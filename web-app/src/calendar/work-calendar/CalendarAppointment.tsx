import { AppointmentModel } from 'appointments/AppointmentModel';
import classNames from 'classnames';
import * as differenceInMinutes from 'date-fns/differenceInMinutes/index';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RootStore } from 'RootStore';
import { getStartOfWorkDay } from './WorkCalendar';

interface ICalendarAppointmentProps {
  appointment: AppointmentModel;
  rootStore?: RootStore;
}

export const getAppointmentPosition = (
  startOfWorkDay: Date,
  appointmentDate: Date,
  duration: number
) => {
  const day = appointmentDate.getDay();
  const column = day === 0 ? 7 : day;

  return {
    column: column + 1,
    row:
      Math.floor(differenceInMinutes(appointmentDate, startOfWorkDay) / 30) + 2,
    rowSpan: duration / 30
  };
};

@inject('rootStore')
@observer
export class CalendarAppointment extends React.Component<
  ICalendarAppointmentProps,
  {}
> {
  public render() {
    const { appointment } = this.props;
    const { appointmentsModel } = this.getRootStore();

    const position = getAppointmentPosition(
      getStartOfWorkDay(appointment.dateTime),
      appointment.dateTime,
      appointment.duration
    );

    return (
      <div
        className={classNames('appointment', {
          'appointment--selected':
            appointmentsModel.selectedAppointmentId.get() === appointment.id
        })}
        data-testid="appointment"
        key={appointment.id}
        data-position={`${position.row}-${position.column}-${position.rowSpan}`}
        style={{
          gridRow: `${position.row} / span ${position.rowSpan}`,
          gridColumn: `${position.column} / span 1`
        }}
        onClick={this.selectAppointment}
      >
        <span data-testid="appointment-client">
          {appointment.getClientFullName(this.getRootStore())}
        </span>
      </div>
    );
  }

  private selectAppointment = () => {
    const { appointment } = this.props;
    const { appointmentsModel } = this.getRootStore();
    appointmentsModel.select(appointment.id);
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}