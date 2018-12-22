import { action, IObservableValue, observable } from 'mobx';
import { AppointmentModel } from './AppointmentModel';

export class AppointmentsModel {
  @observable
  public appointments!: AppointmentModel[];
  @observable
  public selectedAppointmentId!: IObservableValue<string | null>;

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
    const appointment = new AppointmentModel(
      date,
      time,
      duration || 30,
      clientId
    );
    this.appointments.push(appointment);
    return appointment;
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
