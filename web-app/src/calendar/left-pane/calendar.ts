import {
  addDays,
  getDay,
  getDaysInMonth,
  getISOWeek,
  subMonths,
  addMonths
} from 'date-fns';

const range = (count: number, start: number = 1) =>
  Array.from({ length: count }, (v, i) => start + i);

class Day {
  readonly date: number;

  constructor(date: number) {
    this.date = date;
  }
}

class Week {
  readonly num: number;
  readonly days: Array<Day>;

  constructor(num: number, days: Array<Day>) {
    this.num = num;
    this.days = days;
  }
}

export class Calendar {
  private date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  getWeeks() {       
    const days = [
      ...this.getPrevMonthDays(),
      ...this.getCurrentMonthDays(),
      ...this.getNextMonthDays(),
    ];
    return this.groupDaysToWeeks(days);
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
    return dayOfWeek === 0 ? 7 : dayOfWeek;
  }

  private getCurrentMonthDays() {
    return this.calendarDateToDays(this.date)
  }

  private getNextMonthDays() {
    const nextMonth = addMonths(this.date, 1);
    const nextMonthDays = this.calendarDateToDays(nextMonth);
    return nextMonthDays;
  }

  private calendarDateToDays(date: Date) {
    const daysInMonth = getDaysInMonth(date);
    return range(daysInMonth).map(day => new Day(day));
  }

  private groupDaysToWeeks(days: Array<Day>) {
    const weekNumber = getISOWeek(this.date);
    const daysPerWeek = Array<Array<Day>>();
    let weekDays: Array<Day> = [];
    days.forEach((day, i) => {
      weekDays.push(day);
      if ((i + 1) % 7 === 0) {
        daysPerWeek.push(weekDays);
        weekDays = [];
      }
    });
    return range(6, weekNumber).map(
      (weekNum, i) => new Week(weekNum, daysPerWeek[i])
    );
  }
}
