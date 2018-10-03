import * as addMonths from 'date-fns/addMonths';
import * as subMonths from 'date-fns/subMonths';
import { action, observable } from 'mobx';

export class CalendarStore {
  @observable 
  public date: Date = new Date();
  private currentDate: Date;

  constructor(currentDate: Date) {
    this.currentDate = currentDate;
    this.initDate();
  }

  @action
  public nextMonth = () => {
    this.date = addMonths(this.date, 1);
  }

  @action
  public prevMonth = () => {
    this.date = subMonths(this.date, 1);
  }

  @action
  private initDate = () => {
    this.date = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
  }
}
