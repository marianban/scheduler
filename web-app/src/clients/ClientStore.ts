import { ClientModel } from 'clients/ClientModel';
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
      throw new Error('cannot create client with duplicate id')
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

  @action
  private init() {
    this.clients = [];
  }
}