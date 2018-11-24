import { ClientModel } from 'clients/ClientModel';
import { ListView, ListViewItem } from 'components/ListView';
import EmailIcon from 'icons/at-solid.svg';
import CalendarIcon from 'icons/calendar-alt-regular.svg';
import MobileIcon from 'icons/mobile-alt-solid.svg';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootStore } from 'RootStore';
import clientPhoto from './client.jpg';
import './ClientList.css';

interface IClientListProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export class ClientList extends React.Component<IClientListProps, {}> {
  public render() {
    const { clientStore } = this.getRootStore();
    const clients = clientStore.clients;
    return (
      <ListView>
        {clients.map(client =>
          this.renderClient({
            ...client,
            imgSrc: clientPhoto
          })
        )}
      </ListView>
    );
  }

  private renderClient({
    fullName,
    email,
    phoneNumber,
    id,
    imgSrc
  }: {
    imgSrc: string;
  } & Partial<ClientModel>) {
    return (
      <ListViewItem key={id}>
        <div className="client-photo-container">
          <img className="client-photo" src={imgSrc} />
        </div>
        <span className="client-full-name">{fullName}</span>
        <div className="client-details">
          <div className="client-detail">
            <CalendarIcon className="client-icon" />
            <a href="">Tomorrow at 11:00</a>
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

  private getRootStore() {
    return this.props.rootStore!;
  }
}
