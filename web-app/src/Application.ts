import { RootStore } from './RootStore';
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser
} from './GraphQLOperations';
import { ClientModel } from 'clients/ClientModel';

export class Application {
  private readonly store: RootStore;

  constructor(store: RootStore) {
    this.store = store;
  }

  public connectBackend() {
    this.store.clientStore.onClientDeleted(this.deleteClient);
    this.store.clientStore.onClientCreated(this.createClient);
    this.store.clientStore.onClientUpdated(this.updateClient);
    this.loadClients();
  }

  public disconnectBackend() {
    this.store.clientStore.onClientDeleted(() => {});
    this.store.clientStore.onClientCreated(() => {});
    this.store.clientStore.onClientUpdated(() => {});
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
