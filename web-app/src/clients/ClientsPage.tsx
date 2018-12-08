import React from 'react';
import { ClientList } from './ClientList';
import { ClientRightPane } from './ClientRightPane';
import './ClientsPage.css';

export const ClientsPage = () => (
  <React.Fragment>
    <main className="app__main-pane main-pane-clients">
      <ClientList />
    </main>
    <ClientRightPane />
  </React.Fragment>
);
