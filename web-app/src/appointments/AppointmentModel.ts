import { isValid, parse } from 'date-fns';
import * as format from 'date-fns/format/index';
import { action, observable } from 'mobx';
import { RootStore } from 'RootStore';
import { v4 } from 'uuid';
import { IAppointment } from './IAppointment';

export class AppointmentModel implements IAppointment {
  @observable
  public id!: string;
  @observable
  public clientId?: string;
  @observable
  public dateTime!: Date;
  @observable
  public duration!: number;

  constructor(
    date: string,
    time: string,
    duration: number,
    clientId?: string,
    id: string = v4()
  ) {
    this.init(date, time || '00:00', duration, id, clientId);
  }

  @action
  public update({
    date,
    time,
    duration,
    clientId
  }: {
    date: string;
    time: string;
    duration: number;
    clientId?: string;
  }) {
    this.dateTime = this.parseDateTime(date, time);
    this.duration = duration;
    if (clientId) {
      this.clientId = clientId;
    }
  }

  public equals = (appointment: AppointmentModel) => {
    return this.id === appointment.id;
  };

  public hasClient = () => {
    return this.clientId !== undefined;
  };

  public getClient = (rootStore: RootStore) => {
    if (this.clientId === undefined) {
      throw new Error('Client does not exist');
    }

    return rootStore.clientStore.getById(this.clientId);
  };

  public getClientFullName = (rootStore: RootStore) => {
    return this.getClientField(rootStore, 'fullName');
  };

  public getClientEmail = (rootStore: RootStore) => {
    return this.getClientField(rootStore, 'email');
  };

  public getClientPhoneNumber = (rootStore: RootStore) => {
    return this.getClientField(rootStore, 'phoneNumber');
  };

  public getDate = () => {
    return format(this.dateTime, 'd/M/y');
  };

  public getTime = () => {
    return format(this.dateTime, 'H:m');
  };

  private getClientField = (
    rootStore: RootStore,
    field: 'fullName' | 'email' | 'phoneNumber'
  ) => {
    if (this.clientId === undefined) {
      return '';
    }
    return rootStore.clientStore.getById(this.clientId)[field];
  };

  @action
  private init(
    date: string,
    time: string,
    duration: number,
    id: string,
    clientId?: string
  ) {
    this.id = id;
    this.dateTime = this.parseDateTime(date, time);
    this.duration = duration;
    if (clientId) {
      this.clientId = clientId;
    }
  }

  private parseDateTime = (date: string, time: string) => {
    const resultDate = parse(`${date} ${time}`, 'd/M/y H:m', new Date());
    if (!isValid(resultDate)) {
      throw new Error(`Unable to parse given date: ${date}`);
    }
    return resultDate;
  };
}
