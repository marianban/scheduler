import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import React from 'react';
import './App.css';
import Header from './header/Header';
import { RootStore } from './RootStore';
import { Routes } from './Routes';

const rootStore = new RootStore(new Date());

interface IAppProps {
  path: string;
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    const { path } = this.props;
    return (
      <Provider rootStore={rootStore}>
        <div className="app">
          <Header path={path} />
          <Routes path={path} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default App;
