import { CalendarStore } from 'calendar/CalendarStore'

export class RootStore {
  public calendarStore: CalendarStore;

  constructor(currentDate: Date) {
    this.calendarStore = new CalendarStore(currentDate);
  }
}
