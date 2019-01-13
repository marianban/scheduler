import { getWeekDays } from "calendar/getWeekDays";
import { WeekNumbering } from "calendar/WeekNumbering";
import classNames from "classnames";
import addDays from "date-fns/addDays";
import addMinutes from "date-fns/addMinutes";
import format from "date-fns/format";
import isSameWeek from "date-fns/isSameWeek";
import getStartOfWeek from "date-fns/startOfWeek";
import { inject, observer } from "mobx-react";
import React from "react";
import { RootStore } from "RootStore";
import { CalendarAppointment } from "./CalendarAppointment";
import "./CalendarAppointment.css";
import "./WorkCalendar.css";
import { WorkCalendarCell } from "./WorkCalendarCell";

interface IWorkCalendarProps {
  rootStore?: RootStore;
}

export const getStartOfWorkDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0);

export interface IWorkCalendarRefreshAppointment {
  appointmentId: string;
}

@inject("rootStore")
@observer
export class WorkCalendar extends React.Component<IWorkCalendarProps, {}> {
  public render() {
    const { dateSelectionModel, appointmentsModel } = this.getRootStore();
    const { selectedDate } = dateSelectionModel;
    const startOfWeek = getStartOfWorkDay(
      getStartOfWeek(selectedDate, { weekStartsOn: 1 })
    );

    return (
      <div className="work-calendar__week">
        {this.renderHeader(startOfWeek, selectedDate)}
        {this.renderFirstCol(startOfWeek)}
        {this.renderGrid(startOfWeek)}
        {appointmentsModel.appointments
          .filter(appointment =>
            isSameWeek(appointment.dateTime, selectedDate, { weekStartsOn: 1 })
          )
          .map(appointment => {
            return (
              <CalendarAppointment
                key={appointment.id}
                appointment={appointment}
              />
            );
          })}
      </div>
    );
  }

  private renderHeader = (startOfWeek: Date, selectedDate: Date) => {
    const weekDays = [
      { name: "", day: "" },
      ...getWeekDays(WeekNumbering.ISO).map((d, i) => ({
        name: d.threeLetterName,
        day: addDays(startOfWeek, i).getDate()
      }))
    ];

    return weekDays.map((weekDay, i) => (
      <div
        key={weekDay.name}
        className={classNames("work-calendar__week__day__name", {
          "work-calendar__week__day__name--selected":
            i === selectedDate.getDay()
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

  private renderFirstCol = (startOfWeek: Date) =>
    Array.from({ length: 16 }).map((v, rowIndex) => (
      <div
        key={rowIndex}
        className={classNames(
          "work-calendar__week__day",
          "work-calendar__week__hour"
        )}
        style={{
          gridColumn: 1,
          gridRow: rowIndex + 2
        }}
      >
        <span>{format(addMinutes(startOfWeek, 30 * rowIndex), "H:mm")}</span>
      </div>
    ));

  private renderGrid = (startOfWeek: Date) => {
    return Array.from({ length: 16 }).map((v, rowIndex) =>
      Array.from({ length: 7 }).map((v2, colIndex) => {
        const date = addDays(addMinutes(startOfWeek, 30 * rowIndex), colIndex);
        return (
          <WorkCalendarCell
            key={(colIndex + 2) * (rowIndex + 2)}
            date={date}
            column={colIndex}
            row={rowIndex}
            onCreateNewAppointment={this.handleOnCreateNew}
            onAppointmentMoved={this.handleOnAppointmentMoved}
          />
        );
      })
    );
  };

  private handleOnCreateNew = (date: Date) => {
    const { appointmentsModel, pubSub } = this.getRootStore();
    const { id } = appointmentsModel.create({
      date: format(date, "d/M/yyyy"),
      time: format(date, "HH:mm")
    });
    appointmentsModel.select(id);
    pubSub.publish<IWorkCalendarRefreshAppointment>(
      "workCalendarRefreshAppointment",
      { appointmentId: id }
    );
  };

  private handleOnAppointmentMoved = (date: Date, appointmentId: string) => {
    const { appointmentsModel, pubSub } = this.getRootStore();
    const appointment = appointmentsModel.findById(appointmentId);
    appointment.update({
      date: format(date, "d/M/yyyy"),
      time: format(date, "HH:mm")
    });
    pubSub.publish<IWorkCalendarRefreshAppointment>(
      "workCalendarRefreshAppointment",
      { appointmentId }
    );
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
