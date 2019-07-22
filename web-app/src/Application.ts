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

  private async loadClients() {
    const result = await getUsers({});
    if (result.listUsers && result.listUsers.items) {
      const clients = result.listUsers.items.map(i => i!);
      this.store.clientStore.initClients(clients);
    } else {
      console.error('System was unable to load users');
    }
  }

  private createClient(client: Readonly<ClientModel>) {
    createUser(client);
  }

  private updateClient(client: Readonly<ClientModel>) {
    updateUser(client);
  }

  private deleteClient(clientId: string) {
    deleteUser({ id: clientId });
  }
}
