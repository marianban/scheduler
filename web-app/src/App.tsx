import { Button } from 'components/Button';
import * as React from 'react';
import './App.css';
import LeftPane from './calendar/left-pane/LeftPane';
import RightPane from './calendar/right-pane/RightPane';
import Schedule from './calendar/schedule/Schedule';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header className="app__header">
          <nav className="header__nav">
            <a
              href=""
              className="header__nav__calendar header__nav__item--active"
            >
              Calendar
            </a>
            <a href="" className="header__nav__clients">
              Clients
            </a>
            <a href="" className="header__nav__staff">
              Staff
            </a>
          </nav>
        </header>
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
