import { ListView, ListViewItem } from 'components/ListView';
import React from 'react';
import './ClientsPage.css';

export const ClientsPage = () => (
  <React.Fragment>
    <main className="app__main-pane main-pane-clients">
      <ListView>
        <ListViewItem>Annamaria Vamosova</ListViewItem>
        <ListViewItem isSelected={true}>Annamaria Vamosova</ListViewItem>
      </ListView>
    </main>
    <aside className="app__right-pane">client detail</aside>
  </React.Fragment>
);
