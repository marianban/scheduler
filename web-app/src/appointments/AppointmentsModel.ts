import { action, IObservableValue, observable } from 'mobx';
import { callCallbacks } from 'utils/utils';
import { AppointmentModel } from './AppointmentModel';

export class AppointmentsModel {
  @observable
  public appointments!: AppointmentModel[];
  @observable
  public selectedAppointmentId!: IObservableValue<string | null>;
  private canceledCallbacks: Array<(clientId: string) => void> = [];
  private createdCallbacks: Array<
    (client: Readonly<AppointmentModel>) => void
  > = [];

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
    callCallbacks(this.createdCallbacks, appointment);
    return appointment;
  }

  public onAppointmentCreated(
    callback: (client: Readonly<AppointmentModel>) => void
  ) {
    this.createdCallbacks.push(callback);
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
    callCallbacks(this.canceledCallbacks, appointmentId);
  }

  public onAppointmentCanceled(callback: (appointmentId: string) => void) {
    this.canceledCallbacks.push(callback);
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
