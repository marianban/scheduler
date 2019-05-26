import { action, observable } from 'mobx';
import { ClientModel } from './ClientModel';

export class ClientSelectionModel {
  @observable
  public selectedClient!: ClientModel | null;

  constructor() {
    this.init();
  }

  @action
  public select(client: ClientModel) {
    this.selectedClient = client;
  }

  @action
  public unselect() {
    this.selectedClient = null;
  }

  @action
  private init() {
    this.selectedClient = null;
  }
}
