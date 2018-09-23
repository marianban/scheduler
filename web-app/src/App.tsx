import { Button } from 'components/Button';
import * as React from 'react';
import './App.css';
import LeftPane from './calendar/left-pane/LeftPane';
import RightPane from './calendar/right-pane/RightPane';
import Schedule from './calendar/schedule/Schedule';
import Header from './header/Header';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Header />
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
      </div>
    );
  }
}

export default App;
