import {
  addMonths,
  getDay,
  getDaysInMonth,
  getISOWeek,
  getWeek,
  subMonths
} from 'date-fns';
import { Day } from './day';
import { Week } from './week';

const range = (count: number, start: number = 1) =>
  Array.from({ length: count }, (v, i) => start + i);

export class Calendar {
  private date: Date;
  private weekNumbering: string;

  constructor(date: Date, weekNumbering = 'iso') {
    this.date = date;
    this.weekNumbering = weekNumbering;
  }

  public getYear() {
    return this.date.getFullYear();
  }

  public getMonthName() {
    const months = [
      'Janurary',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
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
    return this.weekNumbering === 'iso'
      ? ['Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa', 'Su']
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa'];
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
    if (this.weekNumbering === 'iso') {
      return dayOfWeek === 0 ? 7 : dayOfWeek;
    } else if (this.weekNumbering === 'us') {
      return dayOfWeek + 1;
    } else {
      throw new Error('Unsupported week numbering');
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
    return this.weekNumbering === 'iso' ? getISOWeek(date) : getWeek(date);
  }
}
