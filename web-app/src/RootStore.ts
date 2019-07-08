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
    this.clientStore.onClientDeleted(this.cancelDeletedClientAppointments);
    this.clientStore.onClientDeleted(this.unselectDeletedClient);
  }

  private cancelDeletedClientAppointments = (clientId: string) => {
    this.appointmentsModel.cancelByClientId(clientId);
  };

  private unselectDeletedClient = (clientId: string) => {
    if (
      this.clientSelectionModel.selectedClient !== null &&
      this.clientSelectionModel.selectedClient.id === clientId
    ) {
      if (this.clientStore.clients.length > 0) {
        this.clientSelectionModel.select(this.clientStore.clients[0]);
      } else {
        this.clientSelectionModel.unselect();
      }
    }
  };
}
