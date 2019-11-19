import React from 'react';
import { TeamMemberList } from './TeamMemberList';
import { TeamRightPane } from './TeamRightPane';

export const TeamPage = () => (
  <React.Fragment>
    <main className="app__main-pane main-pane-clients">
      <TeamMemberList />
    </main>
    <TeamRightPane />
  </React.Fragment>
);
