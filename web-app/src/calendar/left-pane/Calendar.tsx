import classNames from "classnames";
import { inject, observer } from "mobx-react";
import React from "react";
import { RootStore } from "RootStore";
import Arrow from "./Arrow.svg";
import "./Calendar.css";
import { CalendarDay } from "./CalendarDay";
import { DateCalendar } from "./DateCalendar";
import { Day } from "./Day";

interface IProps {
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class Calendar extends React.Component<IProps, {}> {
  public render() {
    const { calendarStore, dateSelectionModel } = this.getRootStore();
    const date = calendarStore.date;
    const selectedDate = dateSelectionModel.selectedDate;
    const dateCalendar = new DateCalendar(
      new Date(date.getFullYear(), date.getMonth(), 1)
    );
    const weeks = dateCalendar.getWeeks();
    const weekDays = dateCalendar.getWeekDays().map(d => d.twoLetterName);
    return (
      <div className="calendar">
        <div className="calendar__month">
          <div
            className="calendar__month__btn calendar__month__btn--left"
            onClick={calendarStore.prevMonth}
            role="button"
            data-testid="btn-prev"
          >
            <Arrow style={{ transform: "rotate(180deg)" }} />
          </div>
          <div className="calendar__month__title" data-testid="month-title">
            {dateCalendar.getMonthName()} {dateCalendar.getYear()}
          </div>
          <div
            className="calendar__month__btn calendar__month__btn--right"
            onClick={calendarStore.nextMonth}
            role="button"
            data-testid="btn-next"
          >
            <Arrow />
          </div>
        </div>
        <div className="calendar__weeks">
          <div className="calendar__week">
            {weekDays.map(weekDay => (
              <div className="calendar__week__name" key={weekDay}>
                {weekDay}
              </div>
            ))}
          </div>
          {weeks.map(week => (
            <div
              key={week.num}
              className={classNames("calendar__week", {
                "calendar__week--this": week.includes(selectedDate)
              })}
            >
              <div className="calendar__week__num">{week.num}</div>
              {week.days.map(day => (
                <CalendarDay
                  key={day.num}
                  day={day}
                  onDaySelect={this.handleOnDaySelect}
                  isSelected={day.isSameDayAs(selectedDate)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  private handleOnDaySelect = (day: Day) => {
    const { dateSelectionModel } = this.getRootStore();
    dateSelectionModel.set(day.date);
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
