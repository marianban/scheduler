import { AppointmentsModel } from 'appointmets/AppointmentsModel';
import { CalendarStore } from 'calendar/CalendarStore';
import { ClientStore } from 'clients/ClientStore';

export class RootStore {
  public calendarStore: CalendarStore;
  public clientStore: ClientStore = new ClientStore();
  public appointmentsModel: AppointmentsModel = new AppointmentsModel();

  constructor(currentDate: Date) {
    this.calendarStore = new CalendarStore(currentDate);
  }
}
