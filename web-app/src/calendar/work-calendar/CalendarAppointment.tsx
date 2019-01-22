import { AppointmentModel } from "appointments/AppointmentModel";
import classNames from "classnames";
import { Popover } from "components/Popover";
import differenceInMinutes from "date-fns/differenceInMinutes";
import format from "date-fns/format";
import { inject, observer } from "mobx-react";
import React from "react";
import { RootStore } from "RootStore";
import { ReactComponent as DotsIcon } from "./icon-dots-vertical.svg";
import { getStartOfWorkDay } from "./WorkCalendar";

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

@inject("rootStore")
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
        draggable={true}
        className={classNames("appointment", {
          "appointment--selected":
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
        data-appointment={format(appointment.dateTime, "d/M/yyyy HH:mm")}
        onDragStart={this.handleOnDragStart}
      >
        <span className="appointment-client" data-testid="appointment-client">
          {appointment.getClientFullName(this.getRootStore())}
        </span>
        <Popover
          trigger={<DotsIcon height="25" className="dots-icon" />}
          content={
            <div
              className="popover__menu-item"
              data-testid="popover-menu-item-remove"
              onClick={this.removeAppointment}
            >
              Remove from Calendar
            </div>
          }
        />
      </div>
    );
  }

  private handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const { appointment } = this.props;
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", appointment.id);
  };

  private selectAppointment = () => {
    const { appointment } = this.props;
    const { appointmentsModel } = this.getRootStore();
    appointmentsModel.select(appointment.id);
  };

  private removeAppointment = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { appointment } = this.props;
    const { appointmentsModel } = this.getRootStore();
    appointmentsModel.cancel(appointment.id);
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
