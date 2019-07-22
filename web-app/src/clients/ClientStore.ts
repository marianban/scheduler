import { v4 } from 'uuid';
import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { IClientModel } from 'clients/IClientModel';
import { action, observable } from 'mobx';

export class ClientStore {
  @observable
  public clients!: ClientModel[];
  private clientDeletedCallbacks: Array<(clientId: string) => void> = [];
  private clientUpdatedCallbacks: Array<
    (clientId: Readonly<ClientModel>) => void
  > = [];
  private clientCreatedCallbacks: Array<
    (client: Readonly<ClientModel>) => void
  > = [];

  constructor() {
    this.init();
  }

  @action
  public create({
    fullName,
    phoneNumber,
    email,
    id = v4()
  }: IClient & { id?: string }) {
    const client = new ClientModel(
      fullName,
      phoneNumber,
      email,
      // allow clients without facebookId
      id
    );
    const exists = this.clients.some(c => c.id === client.id);
    if (exists) {
      throw new Error('cannot create client with duplicate id');
    }
    this.clients.push(client);
    return client;
  }

  public onClientCreated(callback: (client: Readonly<ClientModel>) => void) {
    this.clientCreatedCallbacks.push(callback);
  }

  public callClientCreatedCallbacks(client: Readonly<ClientModel>) {
    this.clientCreatedCallbacks.forEach(callback => {
      callback(client);
    });
  }

  @action
  public update(client: ClientModel, data: Partial<IClient>) {
    client.update(data);
  }

  public onClientUpdated(callback: (client: Readonly<ClientModel>) => void) {
    this.clientUpdatedCallbacks.push(callback);
  }

  public callClientUpdatedCallbacks(client: Readonly<ClientModel>) {
    this.clientUpdatedCallbacks.forEach(callback => {
      callback(client);
    });
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
  public initClients(clients: IClientModel[]) {
    this.clients = clients.map(
      c => new ClientModel(c.fullName, c.phoneNumber, c.email, c.id)
    );
  }

  @action
  private init() {
    this.clients = [];
  }
}
