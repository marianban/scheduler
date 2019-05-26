import { action, observable } from 'mobx';
export class DateSelectionModel {
  @observable
  public selectedDate!: Date;

  constructor() {
    this.init();
  }

  @action
  public set = (date: Date) => {
    this.selectedDate = date;
  };

  @action
  private init() {
    this.selectedDate = new Date();
  }
}
