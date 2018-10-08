import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import './App.css';
import { Calendar } from './calendar/Calendar';
import Header from './header/Header';
import { RootStore } from './RootStore';

const rootStore = new RootStore(new Date());

class App extends React.Component {
  public render() {
    return (
      <Provider rootStore={rootStore}>
        <div className="app">
          <Header />
          <Calendar />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default App;
