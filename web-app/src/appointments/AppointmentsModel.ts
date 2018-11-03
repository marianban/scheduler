import { action, observable } from 'mobx';
import { AppointmentModel } from './AppointmentModel';

export class AppointmentsModel {
  @observable
  public appointments!: AppointmentModel[];

  constructor() {
    this.init();
  }

  @action
  public create({
    date,
    time,
    clientId
  }: {
    date: string;
    time: string;
    clientId?: string;
  }) {
    const appointment = new AppointmentModel(date, time, clientId);
    this.appointments.push(appointment);
    return appointment;
  }

  @action
  public cancel(appointmentId: string) {
    const index = this.appointments.findIndex(a => a.id === appointmentId);
    if (index === -1) {
      throw new Error('Unable to cancel nonexisting appointment');
    }
    this.appointments.splice(index, 1);
  }

  @action
  private init() {
    this.appointments = [];
  }
}
