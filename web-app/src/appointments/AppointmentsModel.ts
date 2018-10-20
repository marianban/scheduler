import { action, observable } from 'mobx';
import { AppointmentModel } from './AppointmentModel';

export class AppointmentsModel {
  @observable
  public appointments!: AppointmentModel[];

  constructor() {
    this.init();
  }

  @action
  create({
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
  private init() {
    this.appointments = [];
  }
}
