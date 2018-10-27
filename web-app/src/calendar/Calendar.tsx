import { Button } from 'components/Button';
import * as React from 'react';
import LeftPane from './left-pane/LeftPane';
import { RightPane } from './right-pane/RightPane';
import Schedule from './schedule/Schedule';

export const Calendar = () => (
  <React.Fragment>
    <LeftPane />
    <RightPane />
    <main className="app__main-pane">
      <div className="app__main-pane__controls">
        <Button>Today</Button>
      </div>
      <div className="app__main-pane__content">
        <Schedule />
      </div>
    </main>
  </React.Fragment>
);
