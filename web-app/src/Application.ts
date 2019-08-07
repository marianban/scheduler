import { ClientModel } from 'clients/ClientModel';
import { UnsubscribeCallback } from 'utils/CallbackHandler';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from './GraphQLOperations';
import { RootStore } from './RootStore';

export class Application {
  private readonly store: RootStore;
  private unsubscribeDelete!: UnsubscribeCallback;
  private unsubscribeCreate!: UnsubscribeCallback;
  private unsubscribeUpdate!: UnsubscribeCallback;

  constructor(store: RootStore) {
    this.store = store;
  }

  public connectBackend() {
    this.unsubscribeDelete = this.store.clientStore.onClientDeleted(
      this.deleteClient
    );
    this.unsubscribeCreate = this.store.clientStore.onClientCreated(
      this.createClient
    );
    this.unsubscribeUpdate = this.store.clientStore.onClientUpdated(
      this.updateClient
    );
    this.loadClients();
  }

  public disconnectBackend() {
    this.unsubscribeDelete();
    this.unsubscribeCreate();
    this.unsubscribeUpdate();
  }

  private loadClients = async () => {
    const result = await getUsers({});
    if (result.listUsers && result.listUsers.items) {
      const clients = result.listUsers.items.map(i => i!);
      this.store.clientStore.initClients(clients.map(this.toClientModel));
    } else {
      console.error('System was unable to load users');
    }
  };

  private createClient = (client: Readonly<ClientModel>) => {
    createUser(this.fromClientModel(client));
  };

  private updateClient = (client: Readonly<ClientModel>) => {
    updateUser(this.fromClientModel(client));
  };

  private deleteClient = (clientId: string) => {
    deleteUser({ id: clientId });
  };

  private fromClientModel(client: Readonly<ClientModel>) {
    return {
      ...client,
      email: client.email === '' ? null : client.email,
      phoneNumber: client.phoneNumber === '' ? null : client.phoneNumber
    };
  }

  private toClientModel(client: any) {
    return {
      ...client,
      email: client.email === null ? '' : client.email,
      phoneNumber: client.phoneNumber === null ? '' : client.phoneNumber
    };
  }
}
