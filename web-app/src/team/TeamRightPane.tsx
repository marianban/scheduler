import { UserRole } from 'API';
import { Button } from 'components/Button';
import { ButtonLink } from 'components/ButtonLink';
import { TextField } from 'components/TextField';
import { computed, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootStore } from 'RootStore';
import {
  ITeamMemberValidationResult,
  TeamMemberModel
} from './TeamMemberModel';

interface IState {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  teamMemberVal: ITeamMemberValidationResult;
}

interface ITeamRightPaneProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export class TeamRightPane extends React.Component<
  ITeamRightPaneProps,
  IState
> {
  public readonly state: IState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    role: UserRole.employee,
    teamMemberVal: { isValid: true }
  };

  public componentDidMount() {
    this.ensureTeamMemberSelection();
    this.observeTeamMemberSelectionChange();
    this.initTeamMemberForm();
  }

  public render() {
    const { fullName, email, phoneNumber, teamMemberVal } = this.state;

    return (
      <aside className="app__right-pane">
        <div className="grid-col-2">
          <h2 className="app__right-pane__h">Team Member</h2>
          <ButtonLink
            className="h__btn-link app__right-pane__h"
            onClick={this.handleOnNewTeamMemberClick}
            data-testid="new-client-btn"
            disabled={this.isNewTeamMember}
          >
            new
          </ButtonLink>
        </div>
        <TextField
          title="Full Name"
          name="fullName"
          value={fullName}
          isValid={!teamMemberVal.fullName}
          message={teamMemberVal.fullName}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Email"
          name="email"
          value={email}
          isValid={!teamMemberVal.email}
          message={teamMemberVal.email}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          isValid={!teamMemberVal.phoneNumber}
          message={teamMemberVal.phoneNumber}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <div className="pane__bottom">
          <Button
            className="btn--secondary"
            data-testid="delete-client"
            disabled={this.isNewTeamMember}
            onClick={this.handleOnDeleteTeamMember}
          >
            Delete Team Member
          </Button>
        </div>
      </aside>
    );
  }

  private handleOnDeleteTeamMember = () => {
    const { teamStore, teamSelectionModel } = this.getRootStore();
    teamStore.deleteById(teamSelectionModel.selectedTeamMember!.id);
    this.setState({
      teamMemberVal: { isValid: true }
    });
  };

  private handleOnNewTeamMemberClick = () => {
    const { teamSelectionModel } = this.getRootStore();
    teamSelectionModel.unselect();
    this.setState({
      teamMemberVal: { isValid: true }
    });
  };

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        [event.target.name]: event.target.value
      } as Pick<IState, Exclude<keyof IState, 'teamMemberVal'>>,
      () => {
        const { teamMemberVal } = this.state;
        if (!teamMemberVal.isValid) {
          this.setState({
            teamMemberVal: TeamMemberModel.validate(this.state)
          });
        }
      }
    );
  };

  private handleOnBlur = () => {
    const { teamSelectionModel, teamStore } = this.getRootStore();
    const { selectedTeamMember } = teamSelectionModel;
    const teamMemberVal = TeamMemberModel.validate(this.state);
    this.setState({
      teamMemberVal
    });
    if (teamMemberVal.isValid) {
      if (selectedTeamMember !== null) {
        teamStore.update(selectedTeamMember, this.state);
      } else {
        const teamMember = teamStore.create(this.state);
        teamSelectionModel.select(teamMember);
      }
    }
  };

  private initTeamMemberForm() {
    const { teamSelectionModel } = this.getRootStore();
    if (teamSelectionModel.selectedTeamMember !== null) {
      const { selectedTeamMember } = teamSelectionModel;
      this.setState({
        fullName: selectedTeamMember.fullName,
        phoneNumber: selectedTeamMember.phoneNumber,
        email: selectedTeamMember.email
      });
    }
  }

  @computed
  private get isNewTeamMember() {
    const { teamSelectionModel } = this.getRootStore();
    return teamSelectionModel.selectedTeamMember === null;
  }

  private ensureTeamMemberSelection() {
    const { teamSelectionModel, teamStore } = this.getRootStore();
    reaction(
      () => teamStore.team.length,
      (teamSize: number, r) => {
        if (teamSize > 0 && teamSelectionModel.selectedTeamMember === null) {
          teamSelectionModel.select(teamStore.team[0]);
          r.dispose();
        }
      },
      { fireImmediately: true }
    );
  }

  private observeTeamMemberSelectionChange() {
    const { teamSelectionModel } = this.getRootStore();
    computed(() => teamSelectionModel.selectedTeamMember).observe(
      ({ oldValue, newValue }) => {
        if (
          newValue !== null &&
          (oldValue === null ||
            oldValue === undefined ||
            oldValue.id !== newValue.id)
        ) {
          this.setState({
            fullName: newValue.fullName,
            email: newValue.email,
            phoneNumber: newValue.phoneNumber
          });
        }
        if (newValue === null) {
          this.setState({
            fullName: '',
            email: '',
            phoneNumber: ''
          });
        }
      }
    );
  }

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
