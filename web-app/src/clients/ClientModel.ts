import { action, observable } from 'mobx';
import { v4 } from 'uuid';
import { IClient } from './IClient';

export class ClientModel implements IClient {
  @observable
  public id!: string;
  @observable
  public fullName!: string;
  @observable
  public phoneNumber!: string;
  @observable
  public email!: string;

  constructor(
    fullName: string,
    phoneNumber: string,
    email: string,
    id: string = v4()
  ) {
    this.init(fullName, phoneNumber, email, id);
  }

  @action
  public update({
    fullName,
    phoneNumber,
    email
  }: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  }) {
    if (fullName || fullName === '') {
      this.fullName = fullName;
    }
    if (phoneNumber || phoneNumber === '') {
      this.phoneNumber = phoneNumber;
    }
    if (email || email === '') {
      this.email = email;
    }
  }

  public equals(client: IClient) {
    return this.fullName === client.fullName;
  }

  @action
  private init(
    fullName: string,
    phoneNumber: string,
    email: string,
    id: string
  ) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.id = id;
  }
}
