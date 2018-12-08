import { observable } from 'mobx';
import { ClientModel } from './ClientModel';

export class ClientSelectionModel {
  @observable
  public selectedClient: ClientModel | null = null;

  public select(client: ClientModel) {
    this.selectedClient = client;
  }
}
