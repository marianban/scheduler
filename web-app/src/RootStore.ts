import { AppointmentsModel } from 'appointments/AppointmentsModel';
import { CalendarStore } from 'calendar/CalendarStore';
import { DateSelectionModel } from 'calendar/DateSelectionModel';
import { ClientSelectionModel } from 'clients/ClientSelectionModel';
import { ClientStore } from 'clients/ClientStore';
import { PubSub } from 'PubSub';

export class RootStore {
  public calendarStore: CalendarStore;
  public clientStore: ClientStore;
  public appointmentsModel: AppointmentsModel;
  public dateSelectionModel: DateSelectionModel = new DateSelectionModel();
  public pubSub: PubSub = new PubSub();
  public clientSelectionModel: ClientSelectionModel;

  constructor(currentDate: Date) {
    this.clientStore = new ClientStore();
    this.appointmentsModel = new AppointmentsModel();
    this.clientSelectionModel = new ClientSelectionModel();
    this.calendarStore = new CalendarStore(currentDate);
    this.clientStore.onClientDeleted(this.handleClientDeleted);
  }

  private handleClientDeleted = (clientId: string) => {
    this.appointmentsModel.cancelByClientId(clientId);
    if (
      this.clientSelectionModel.selectedClient !== null &&
      this.clientSelectionModel.selectedClient.id === clientId
    ) {
      this.clientSelectionModel.unselect();
    }
  };
}
