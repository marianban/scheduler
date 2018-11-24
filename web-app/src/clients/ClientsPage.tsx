import React from 'react';
import { ClientList } from './ClientList';
import './ClientsPage.css';

export const ClientsPage = () => (
  <React.Fragment>
    <main className="app__main-pane main-pane-clients">
      <ClientList />
    </main>
    <aside className="app__right-pane">client detail</aside>
  </React.Fragment>
);
