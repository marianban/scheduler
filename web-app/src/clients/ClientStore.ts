import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { IClientModel } from 'clients/IClientModel';
import { action, observable } from 'mobx';
import { CallbackHandler, UnsubscribeCallback } from 'utils/CallbackHandler';
import { v4 } from 'uuid';

export class ClientStore {
  @observable
  public clients!: ClientModel[];
  private deletedCallbacks = new CallbackHandler<string>();
  private updatedCallbacks = new CallbackHandler<ClientModel>();
  private createdCallbacks = new CallbackHandler<ClientModel>();

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
    this.clients.unshift(client);
    this.createdCallbacks.handle(client);
    return client;
  }

  public onClientCreated(
    callback: (client: Readonly<ClientModel>) => void
  ): UnsubscribeCallback {
    return this.createdCallbacks.add(callback);
  }

  @action
  public update(client: ClientModel, data: Partial<IClient>) {
    client.update(data);
    this.updatedCallbacks.handle(client);
  }

  public onClientUpdated(
    callback: (client: Readonly<ClientModel>) => void
  ): UnsubscribeCallback {
    return this.updatedCallbacks.add(callback);
  }

  @action
  public deleteById(clientId: string) {
    const index = this.clients.findIndex(c => c.id === clientId);
    if (index === -1) {
      throw new Error('specified client does not exists');
    }
    this.clients.splice(index, 1);
    this.deletedCallbacks.handle(clientId);
  }

  public onClientDeleted(
    callback: (clientId: string) => void
  ): UnsubscribeCallback {
    return this.deletedCallbacks.add(callback);
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
      c =>
        new ClientModel(
          c.fullName,
          c.phoneNumber,
          c.email,
          c.id,
          c.facebookUserId
        )
    );
  }

  @action
  private init() {
    this.clients = [];
  }
}
