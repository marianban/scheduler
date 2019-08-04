import { Button } from 'components/button';
import React from 'react';
import LeftPane from './left-pane/LeftPane';
import { RightPane } from './right-pane/RightPane';
import { WorkCalendar } from './work-calendar/WorkCalendar';

export const CalendarPage = () => (
  <React.Fragment>
    <LeftPane />
    <RightPane />
    <main className="app__main-pane">
      <div className="app__main-pane__controls">
        <Button>Today</Button>
      </div>
      <div className="app__main-pane__content">
        <WorkCalendar />
      </div>
    </main>
  </React.Fragment>
);
