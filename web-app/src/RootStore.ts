import { AppointmentsModel } from 'appointments/AppointmentsModel';
import { CalendarStore } from 'calendar/CalendarStore';
import { DateSelectionModel } from 'calendar/DateSelectionModel';
import { ClientStore } from 'clients/ClientStore';

export class RootStore {
  public calendarStore: CalendarStore;
  public clientStore: ClientStore = new ClientStore();
  public appointmentsModel: AppointmentsModel = new AppointmentsModel();
  public dateSelectionModel: DateSelectionModel = new DateSelectionModel();

  constructor(currentDate: Date) {
    this.calendarStore = new CalendarStore(currentDate);
  }
}
