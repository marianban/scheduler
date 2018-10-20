import { parse } from 'date-fns';
import { action, observable } from 'mobx';
import { v4 } from 'uuid';
import { IAppointment } from './IAppointment';

export class AppointmentModel implements IAppointment {
  @observable
  public id!: string;
  @observable
  public clientId?: string;
  @observable
  public dateTime!: Date;

  constructor(
    date: string,
    time: string,
    clientId?: string,
    id: string = v4()
  ) {
    this.init(date, time, id, clientId);
  }

  @action
  public update({
    date,
    time,
    clientId
  }: {
    date: string;
    time: string;
    clientId?: string;
  }) {
    this.dateTime = this.parseDateTime(date, time);
    if (clientId) {
      this.clientId = clientId;
    }
  }

  @action
  private init(date: string, time: string, id: string, clientId?: string) {
    this.id = id;
    this.dateTime = this.parseDateTime(date, time);
  }

  private parseDateTime = (date: string, time: string) => {
    return parse(`${date} ${time}`, 'dd.MM.yyyy HH:mm', new Date());
  };
}
