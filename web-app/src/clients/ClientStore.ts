import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { action, observable } from 'mobx';

export class ClientStore {
  @observable
  public clients!: ClientModel[];

  constructor() {
    this.init();
  }

  @action
  public create(client: ClientModel) {
    const exists = this.clients.some(c => c.id === client.id);
    if (exists) {
      throw new Error('cannot create client with duplicate id');
    }
    this.clients.push(client);
  }

  @action
  public deleteById(clientId: string) {
    const index = this.clients.findIndex(c => c.id === clientId);
    if (index === -1) {
      throw new Error('specified client does not exists');
    }
    this.clients.splice(index, 1);
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
      throw new Error(`client: ${fullName} does not exists`);
    }
    return client;
  };

  @action
  private init() {
    this.clients = [];
  }
}
