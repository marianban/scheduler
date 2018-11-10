import { AppointmentsModel } from 'appointments/AppointmentsModel';
import { CalendarStore } from 'calendar/CalendarStore';
import { DateSelectionModel } from 'calendar/DateSelectionModel';
import { ClientStore } from 'clients/ClientStore';
import { PubSub } from 'PubSub';

export class RootStore {
  public calendarStore: CalendarStore;
  public clientStore: ClientStore = new ClientStore();
  public appointmentsModel: AppointmentsModel = new AppointmentsModel();
  public dateSelectionModel: DateSelectionModel = new DateSelectionModel();
  public pubSub: PubSub = new PubSub();

  constructor(currentDate: Date) {
    this.calendarStore = new CalendarStore(currentDate);
  }
}
