import { action, IObservableValue, observable } from 'mobx';
import { CallbackHandler, UnsubscribeCallback } from 'utils/CallbackHandler';
import { AppointmentModel } from './AppointmentModel';
import { IAppointment } from './IAppointment';

export class AppointmentsModel {
  @observable
  public appointments!: AppointmentModel[];
  @observable
  public selectedAppointmentId!: IObservableValue<string | null>;
  private canceledCallbacks = new CallbackHandler<string>();
  private createdCallbacks = new CallbackHandler<AppointmentModel>();
  private updatedCallbacks = new CallbackHandler<AppointmentModel>();

  constructor() {
    this.init();
  }

  @action
  public create({
    date,
    time,
    duration,
    clientId
  }: {
    date: string;
    time: string;
    duration?: number;
    clientId?: string;
  }) {
    const appointment = AppointmentModel.from(
      date,
      time || '00:00',
      duration || 30,
      new Date(),
      clientId
    );
    this.appointments.push(appointment);
    this.createdCallbacks.handle(appointment);
    return appointment;
  }

  public update(
    appointment: AppointmentModel,
    data: {
      date?: string;
      time?: string;
      duration?: number;
      clientId?: string;
    }
  ) {
    appointment.update(data);
    this.updatedCallbacks.handle(appointment);
  }

  public onAppointmentUpdated(
    callback: (client: Readonly<AppointmentModel>) => void
  ): UnsubscribeCallback {
    return this.updatedCallbacks.add(callback);
  }

  public onAppointmentCreated(
    callback: (client: Readonly<AppointmentModel>) => void
  ): UnsubscribeCallback {
    return this.createdCallbacks.add(callback);
  }

  @action
  public cancelByClientId(clientId: string) {
    const appointmentIds = this.appointments
      .filter(a => a.clientId === clientId)
      .map(a => a.id);
    appointmentIds.forEach(appointmentId => {
      this.cancel(appointmentId);
    });
  }

  @action
  public cancel(appointmentId: string) {
    this.assertExistence(appointmentId);
    const index = this.appointments.findIndex(a => a.id === appointmentId);
    this.appointments.splice(index, 1);
    if (this.selectedAppointmentId.get() === appointmentId) {
      this.selectedAppointmentId.set(null);
    }
    this.canceledCallbacks.handle(appointmentId);
  }

  public onAppointmentCanceled(
    callback: (appointmentId: string) => void
  ): UnsubscribeCallback {
    return this.canceledCallbacks.add(callback);
  }

  @action
  public select(appointmentId: string) {
    this.assertExistence(appointmentId);
    this.selectedAppointmentId.set(appointmentId);
  }

  @action
  public unselect() {
    this.selectedAppointmentId.set(null);
  }

  public findById(appointmentId: string) {
    this.assertExistence(appointmentId);
    return this.appointments.find(a => a.id === appointmentId)!;
  }

  @action
  public initAppointments(appointments: IAppointment[]) {
    this.appointments = appointments.map(
      a =>
        new AppointmentModel(
          a.dateTime,
          a.duration,
          a.createdAt,
          a.clientId,
          a.id
        )
    );
  }

  @action
  private init() {
    this.appointments = [];
    this.selectedAppointmentId = observable.box(null);
  }

  private assertExistence(appointmentId: string) {
    const exists = this.appointments.some(a => a.id === appointmentId);
    if (!exists) {
      throw new Error(
        `Unable to cancel nonexisting appointment: ${appointmentId}`
      );
    }
  }
}
