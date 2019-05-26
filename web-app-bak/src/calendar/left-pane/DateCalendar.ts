import { getWeekDays } from "calendar/getWeekDays";
import { WeekNumbering } from "calendar/WeekNumbering";
import addMonths from "date-fns/addMonths";
import getDay from "date-fns/getDay";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getISOWeek from "date-fns/getISOWeek";
import getWeek from "date-fns/getWeek";
import subMonths from "date-fns/subMonths";

import { Day } from "./Day";
import { Week } from "./Week";

const range = (count: number, start: number = 1) =>
  Array.from({ length: count }, (v, i) => start + i);

export class DateCalendar {
  private date: Date;
  private weekNumbering: WeekNumbering;

  constructor(date: Date, weekNumbering = WeekNumbering.ISO) {
    this.date = date;
    this.weekNumbering = weekNumbering;
  }

  public getYear() {
    return this.date.getFullYear();
  }

  public getMonthName() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[this.date.getMonth()];
  }

  public getWeeks() {
    const days = [
      ...this.getPrevMonthDays(),
      ...this.getCurrentMonthDays(),
      ...this.getNextMonthDays()
    ];
    return this.groupDaysToWeeks(days);
  }

  public getWeekDays() {
    return getWeekDays(this.weekNumbering);
  }

  private getPrevMonthDays() {
    const dayOfWeek = this.getDay();
    const missingDays = dayOfWeek - 1;
    const prevMonth = subMonths(this.date, 1);
    const prevMonthDays = this.calendarDateToDays(prevMonth);
    return prevMonthDays.slice(prevMonthDays.length - missingDays);
  }

  private getDay() {
    const dayOfWeek = getDay(this.date);
    switch (this.weekNumbering) {
      case WeekNumbering.ISO:
        return dayOfWeek === 0 ? 7 : dayOfWeek;
      case WeekNumbering.NorthAmerican:
        return dayOfWeek + 1;
      default:
        throw new Error("Unsupported week numbering");
    }
  }

  private getCurrentMonthDays() {
    return this.calendarDateToDays(this.date, true);
  }

  private getNextMonthDays() {
    const nextMonth = addMonths(this.date, 1);
    const nextMonthDays = this.calendarDateToDays(nextMonth);
    return nextMonthDays;
  }

  private calendarDateToDays(date: Date, isActiveMonth = false) {
    const daysInMonth = getDaysInMonth(date);
    return range(daysInMonth).map(
      day =>
        new Day(
          day,
          new Date(date.getFullYear(), date.getMonth(), day),
          isActiveMonth
        )
    );
  }

  private groupDaysToWeeks(days: Day[]) {
    const daysPerWeek = Array<Day[]>();
    let weekDays: Day[] = [];
    const weekNumbers: number[] = [];
    days.forEach((day, i) => {
      weekDays.push(day);
      if ((i + 1) % 7 === 0 && daysPerWeek.length < 6) {
        daysPerWeek.push(weekDays);
        weekNumbers.push(this.getWeek(day.date));
        weekDays = [];
      }
    });
    return weekNumbers.map((weekNum, i) => new Week(weekNum, daysPerWeek[i]));
  }

  private getWeek(date: Date) {
    return this.weekNumbering === WeekNumbering.ISO
      ? getISOWeek(date)
      : getWeek(date);
  }
}
