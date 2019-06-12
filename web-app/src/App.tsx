import { Provider } from 'mobx-react';
import React, { lazy, Suspense } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import './App.css';
import Header from './header/Header';
import { RootStore } from './RootStore';
import { Routes } from './Routes';
import * as awsmobile from './aws-exports.js';

Amplify.configure((awsmobile as any).default);

const DevTools = lazy(() =>
  process.env.NODE_ENV === 'production'
    ? (import('mobx-react-devtools') as any)
    : Promise.resolve({ default: () => null })
);

const rootStore = new RootStore(new Date());

interface IAppProps {
  path: string;
}

interface IAppState {
  user: any;
}

class App extends React.Component<IAppProps, IAppState> {
  state = { user: null };

  componentDidMount() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          Auth.currentAuthenticatedUser()
            .then(user => this.setState({ user }))
            .catch(() => console.log('Not signed in'));
          break;
        case 'signOut':
          this.setState({ user: null });
          break;
      }
    });
  }

  public render() {
    const { user } = this.state;
    const { path } = this.props;
    return (
      <Provider rootStore={rootStore}>
        <div className="app">
          <Header path={path} user={user} />
          <Routes path={path} />
          <Suspense fallback={null}>
            <DevTools />
          </Suspense>
        </div>
      </Provider>
    );
  }
}

export default App;
