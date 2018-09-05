import { Day } from "./day";

export class Week {
  public readonly num: number;
  public readonly days: Day[];

  constructor(num: number, days: Day[]) {
    this.num = num;
    this.days = days;
  }

  public includes(date: Date) {
    return this.days.some(day =>
      day.isSameDayAs(date)
    )
  }
}