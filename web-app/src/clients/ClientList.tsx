import { ListView, ListViewItem } from 'components/ListView';
import EmailIcon from 'icons/at-solid.svg';
import CalendarIcon from 'icons/calendar-alt-regular.svg';
import MobileIcon from 'icons/mobile-alt-solid.svg';
import React from 'react';
import clientPhoto from './client.jpg';
import './ClientList.css';

export class ClientList extends React.Component {
  public render() {
    return (
      <ListView>
        {this.renderClient({
          fullName: 'Annamaria Vamosova',
          imgSrc: clientPhoto
        })}
      </ListView>
    );
  }

  private renderClient({
    fullName,
    imgSrc
  }: {
    fullName: string;
    imgSrc: string;
  }) {
    return (
      <ListViewItem>
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
            +421908042407
          </div>
          <div className="client-detail">
            <EmailIcon className="client-icon" />
            anicka.vamosova@gmail.com
          </div>
        </div>
      </ListViewItem>
    );
  }
}
