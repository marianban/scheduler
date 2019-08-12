import { AppointmentModel } from 'appointments/AppointmentModel';
import { ClientModel } from 'clients/ClientModel';
import { UnsubscribeCallback } from 'utils/CallbackHandler';
import {
  createAppointment,
  createUser,
  deleteAppointment,
  deleteUser,
  getAppointments,
  getUsers,
  updateAppointment,
  updateUser
} from './GraphQLOperations';
import { RootStore } from './RootStore';

export class Application {
  private readonly store: RootStore;
  private unsubscribeDelete!: UnsubscribeCallback;
  private unsubscribeCreate!: UnsubscribeCallback;
  private unsubscribeUpdate!: UnsubscribeCallback;
  private unsubscribeCreateAppointment!: UnsubscribeCallback;
  private unsubscribeCancelAppointment!: UnsubscribeCallback;
  private unsubscribeUpdateAppointment!: UnsubscribeCallback;

  constructor(store: RootStore) {
    this.store = store;
  }

  public async connectBackend() {
    this.unsubscribeDelete = this.store.clientStore.onClientDeleted(
      this.deleteClient
    );
    this.unsubscribeCreate = this.store.clientStore.onClientCreated(
      this.createClient
    );
    this.unsubscribeUpdate = this.store.clientStore.onClientUpdated(
      this.updateClient
    );
    this.unsubscribeCreateAppointment = this.store.appointmentsModel.onAppointmentCreated(
      this.createAppointment
    );
    this.unsubscribeCancelAppointment = this.store.appointmentsModel.onAppointmentCanceled(
      this.cancelAppointment
    );
    this.unsubscribeUpdateAppointment = this.store.appointmentsModel.onAppointmentUpdated(
      this.updateAppointment
    );
    await Promise.all([this.loadClients(), this.loadAppointments()]);
  }

  public disconnectBackend() {
    this.unsubscribeDelete();
    this.unsubscribeCreate();
    this.unsubscribeUpdate();
    this.unsubscribeCreateAppointment();
    this.unsubscribeCancelAppointment();
    this.unsubscribeUpdateAppointment();
  }

  private loadClients = async () => {
    const result = await getUsers({});
    if (result.listUsers && result.listUsers.items) {
      const clients = result.listUsers.items.map(i => i!);
      this.store.clientStore.initClients(clients.map(this.toClientModel));
    } else {
      console.error('System was unable to load users');
    }
  };

  private createClient = (client: Readonly<ClientModel>) => {
    createUser(this.fromClientModel(client));
  };

  private updateClient = (client: Readonly<ClientModel>) => {
    updateUser(this.fromClientModel(client));
  };

  private deleteClient = (clientId: string) => {
    deleteUser({ id: clientId });
  };

  private fromClientModel(client: Readonly<ClientModel>) {
    return {
      ...client,
      email: client.email === '' ? null : client.email,
      phoneNumber: client.phoneNumber === '' ? null : client.phoneNumber
    };
  }

  private toClientModel(client: any) {
    return {
      ...client,
      email: client.email === null ? '' : client.email,
      phoneNumber: client.phoneNumber === null ? '' : client.phoneNumber
    };
  }

  private loadAppointments = async () => {
    const result = await getAppointments({});
    if (result.listAppointments && result.listAppointments.items) {
      const appointments = result.listAppointments.items.map(i => i!);
      this.store.appointmentsModel.initAppointments(
        appointments.map(this.toAppointmentModel)
      );
    } else {
      console.error('System was unable to load appointments');
    }
  };

  private createAppointment = (appointment: Readonly<AppointmentModel>) => {
    console.log('createAppointment', appointment);
    createAppointment(this.fromAppointmentModel(appointment));
  };

  private cancelAppointment = (appointmentId: string) => {
    console.log('cancelAppointment', this.cancelAppointment);
    deleteAppointment({ id: appointmentId });
  };

  private updateAppointment = (appointment: Readonly<AppointmentModel>) => {
    console.log('updateAppointment', appointment);
    updateAppointment(this.fromAppointmentModel(appointment));
  };

  private fromAppointmentModel(appointment: Readonly<AppointmentModel>) {
    return {
      ...appointment,
      createdAt: appointment.createdAt.toISOString(),
      dateTime: appointment.dateTime.toISOString(),
      clientId: appointment.hasClient() ? appointment.clientId : null
    };
  }

  private toAppointmentModel(appointment: any) {
    return {
      ...appointment,
      createdAt: new Date(appointment.createdAt),
      dateTime: new Date(appointment.dateTime),
      clientId: appointment.clientId === null ? undefined : appointment.clientId
    };
  }
}
