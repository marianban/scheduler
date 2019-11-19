import { action, observable } from 'mobx';
import { ITeamMember } from 'team/ITeamMember';
import { ITeamMemberModel } from 'team/ITeamMemberModel';
import { TeamMemberModel } from 'team/TeamMemberModel';
import { CallbackHandler, UnsubscribeCallback } from 'utils/CallbackHandler';
import { v4 } from 'uuid';

export class TeamStore {
  @observable
  public team!: TeamMemberModel[];
  private deletedCallbacks = new CallbackHandler<string>();
  private updatedCallbacks = new CallbackHandler<TeamMemberModel>();
  private createdCallbacks = new CallbackHandler<TeamMemberModel>();

  constructor() {
    this.init();
  }

  @action
  public create({
    fullName,
    phoneNumber,
    email,
    id = v4(),
    role
  }: ITeamMember & { id?: string }) {
    const teamMember = new TeamMemberModel(
      fullName,
      phoneNumber,
      email,
      // allow teamMembers without facebookId
      role,
      id
    );
    const exists = this.team.some(c => c.id === teamMember.id);
    if (exists) {
      throw new Error('cannot create teamMember with duplicate id');
    }
    this.team.unshift(teamMember);
    this.createdCallbacks.handle(teamMember);
    return teamMember;
  }

  public onTeamMemberCreated(
    callback: (teamMember: Readonly<TeamMemberModel>) => void
  ): UnsubscribeCallback {
    return this.createdCallbacks.add(callback);
  }

  @action
  public update(teamMember: TeamMemberModel, data: Partial<ITeamMember>) {
    teamMember.update(data);
    this.updatedCallbacks.handle(teamMember);
  }

  public onTeamMemberUpdated(
    callback: (teamMember: Readonly<TeamMemberModel>) => void
  ): UnsubscribeCallback {
    return this.updatedCallbacks.add(callback);
  }

  @action
  public deleteById(teamMemberId: string) {
    const index = this.team.findIndex(c => c.id === teamMemberId);
    if (index === -1) {
      throw new Error('specified teamMember does not exists');
    }
    this.team.splice(index, 1);
    this.deletedCallbacks.handle(teamMemberId);
  }

  public onTeamMemberDeleted(
    callback: (teamMemberId: string) => void
  ): UnsubscribeCallback {
    return this.deletedCallbacks.add(callback);
  }

  public exists = (teamMember: Partial<ITeamMember>) => {
    if (teamMember.fullName) {
      const found = this.team.some(c => c.fullName === teamMember.fullName);
      return found;
    }
    return false;
  };

  public getByFullName = (fullName: string) => {
    const teamMember = this.team.find(c => c.fullName === fullName);
    if (teamMember === undefined) {
      throw new Error(`teamMember with name: ${fullName} does not exists`);
    }
    return teamMember;
  };

  public getById = (id: string) => {
    const teamMember = this.team.find(c => c.id === id);
    if (teamMember === undefined) {
      throw new Error(`teamMember with id: ${id} does not exists`);
    }
    return teamMember;
  };

  @action
  public initTeamMembers(teamMembers: ITeamMemberModel[]) {
    this.team = teamMembers.map(
      c =>
        new TeamMemberModel(
          c.fullName,
          c.phoneNumber,
          c.email,
          c.role,
          c.id,
          c.facebookUserId
        )
    );
  }

  @action
  private init() {
    this.team = [];
  }
}
