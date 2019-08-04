export class Day {
  public readonly num: number;
  public readonly date: Date;
  public readonly isActiveMonth: boolean;

  constructor(num: number, date: Date, isActiveMonth: boolean = false) {
    this.num = num;
    this.date = date;
    this.isActiveMonth = isActiveMonth;
  }

  public isSameDayAs(date: Date) {
    return this.date.toDateString() === date.toDateString();
  }
}
