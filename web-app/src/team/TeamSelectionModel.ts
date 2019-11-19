import { action, observable } from 'mobx';
import { TeamMemberModel } from './TeamMemberModel';

export class TeamSelectionModel {
  @observable
  public selectedTeamMember!: TeamMemberModel | null;

  constructor() {
    this.init();
  }

  @action
  public select(teamMember: TeamMemberModel) {
    this.selectedTeamMember = teamMember;
  }

  @action
  public unselect() {
    this.selectedTeamMember = null;
  }

  @action
  private init() {
    this.selectedTeamMember = null;
  }
}
