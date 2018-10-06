import { CalendarStore } from 'calendar/CalendarStore'
import { ClientStore } from 'clients/ClientStore'

export class RootStore {
  public calendarStore: CalendarStore;
  public clientStore: ClientStore = new ClientStore();

  constructor(currentDate: Date) {
    this.calendarStore = new CalendarStore(currentDate);
  }
}
