import { ClientModel } from 'clients/ClientModel';
import { ListView, ListViewItem } from 'components/ListView';
import { ReactComponent as EmailIcon } from 'icons/at-solid.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar-alt-regular.svg';
import { ReactComponent as MobileIcon } from 'icons/mobile-alt-solid.svg';
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
    const { clientSelectionModel } = this.getRootStore();
    const selectedClient = clientSelectionModel.selectedClient;
    const isSelected = selectedClient !== null && selectedClient.id === id;
    return (
      <ListViewItem
        key={id}
        isSelected={isSelected}
        id={id!}
        onClick={this.selectClient}
      >
        <div className="client-photo-container">
          <img className="client-photo" src={imgSrc} alt={fullName} />
        </div>
        <span className="client-full-name">{fullName}</span>
        <div className="client-details">
          <div className="client-detail">
            <CalendarIcon className="client-icon" />
            <a href="#">Tomorrow at 11:00</a>
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

  private selectClient = (clientId: string) => {
    const { clientStore, clientSelectionModel } = this.getRootStore();
    const client = clientStore.getById(clientId);
    clientSelectionModel.select(client);
  };

  private getRootStore() {
    return this.props.rootStore!;
  }
}
