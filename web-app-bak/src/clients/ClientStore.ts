import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { action, observable } from 'mobx';

export class ClientStore {
  @observable
  public clients!: ClientModel[];
  private clientDeletedCallbacks: Array<(clientId: string) => void> = [];

  constructor() {
    this.init();
  }

  @action
  public create(data: IClient & { id?: string }) {
    const client = new ClientModel(
      data.fullName,
      data.phoneNumber,
      data.email,
      data.id
    );
    const exists = this.clients.some(c => c.id === client.id);
    if (exists) {
      throw new Error('cannot create client with duplicate id');
    }
    this.clients.push(client);
    return client;
  }

  @action
  public deleteById(clientId: string) {
    const index = this.clients.findIndex(c => c.id === clientId);
    if (index === -1) {
      throw new Error('specified client does not exists');
    }
    this.clients.splice(index, 1);
    this.callClientDeletedCallbacks(clientId);
  }

  public onClientDeleted(callback: (clientId: string) => void) {
    this.clientDeletedCallbacks.push(callback);
  }

  public callClientDeletedCallbacks(clientId: string) {
    this.clientDeletedCallbacks.forEach(callback => {
      callback(clientId);
    });
  }

  public exists = (client: Partial<IClient>) => {
    if (client.fullName) {
      const found = this.clients.some(c => c.fullName === client.fullName);
      return found;
    }
    return false;
  };

  public getByFullName = (fullName: string) => {
    const client = this.clients.find(c => c.fullName === fullName);
    if (client === undefined) {
      throw new Error(`client with name: ${fullName} does not exists`);
    }
    return client;
  };

  public getById = (id: string) => {
    const client = this.clients.find(c => c.id === id);
    if (client === undefined) {
      throw new Error(`client with id: ${id} does not exists`);
    }
    return client;
  };

  @action
  private init() {
    this.clients = [];
  }
}
