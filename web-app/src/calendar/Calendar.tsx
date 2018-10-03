import { CalendarStore } from 'calendar/CalendarStore';
import { Button } from 'components/Button';
import { Provider } from 'mobx-react';
import * as React from 'react';
import LeftPane from './left-pane/LeftPane';
import RightPane from './right-pane/RightPane';
import Schedule from './schedule/Schedule';

const calendarStore = new CalendarStore(new Date());

export const Calendar = () => (
  <Provider calendar={calendarStore}>
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
  </Provider>
);
