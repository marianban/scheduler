import { ClientModel } from 'clients/ClientModel';
import { ListView, ListViewItem } from 'components/ListView';
import { ReactComponent as EmailIcon } from 'icons/at-solid.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar-alt-regular.svg';
import UserMobileIcon from 'icons/icon-user.svg';
import { ReactComponent as MobileIcon } from 'icons/mobile-alt-solid.svg';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootStore } from 'RootStore';

interface ITeamMemberListProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export class TeamMemberList extends React.Component<ITeamMemberListProps, {}> {
  public render() {
    const { clientStore } = this.getRootStore();
    const team = clientStore.team;
    return (
      <ListView>
        {team.map(member =>
          this.renderTeamMember({
            ...member
          })
        )}
      </ListView>
    );
  }

  private renderTeamMember({
    fullName,
    email,
    phoneNumber,
    id,
    facebookUserId
  }: Partial<ClientModel>) {
    const { teamMemberSelectionModel } = this.getRootStore();
    const selectedTeamMember = teamMemberSelectionModel.selectedTeamMember;
    const isSelected =
      selectedTeamMember !== null && selectedTeamMember.id === id;
    return (
      <ListViewItem
        key={id}
        isSelected={isSelected}
        id={id!}
        onClick={this.selectTeamMember}
      >
        <div className="client-photo-container">
          {facebookUserId && (
            <object
              data={`https://graph.facebook.com/v3.3/${facebookUserId}/picture`}
              type="image/jpeg"
              height="50"
              className="client-photo"
              title={fullName}
            >
              {/* fallback image in case the original image can't be loaded */}
              <img
                className="client-photo"
                src={UserMobileIcon}
                alt={fullName}
              />
            </object>
          )}
          {!facebookUserId && (
            <img className="client-photo" src={UserMobileIcon} alt={fullName} />
          )}
        </div>
        <span className="client-full-name">{fullName}</span>
        <div className="client-details">
          <div className="client-detail">
            <CalendarIcon className="client-icon" />
            <a href="link/#">Tomorrow at 11:00</a>
          </div>
          <div className="client-detail">
            <MobileIcon className="client-icon" />
            {phoneNumber}
          </div>
          <div className="client-detail">
            <EmailIcon className="client-icon" />
            {email}
          </div>
        </div>
      </ListViewItem>
    );
  }

  private selectTeamMember = (teamMemberId: string) => {
    const { teamStore, teamMemberSelectionModel } = this.getRootStore();
    const teamMember = teamStore.getById(teamMemberId);
    teamMemberSelectionModel.select(teamMember);
  };

  private getRootStore() {
    return this.props.rootStore!;
  }
}
