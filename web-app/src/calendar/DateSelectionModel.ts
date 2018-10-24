import { action, observable } from 'mobx';

export class DateSelectionModel {
  @observable
  public selectedDate: Date = new Date();

  @action
  public set = (date: Date) => {
    this.selectedDate = date;
  };
}
