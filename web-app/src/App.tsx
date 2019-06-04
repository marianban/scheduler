import { Provider } from 'mobx-react';
import React, { lazy, Suspense } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import './App.css';
import Header from './header/Header';
import { RootStore } from './RootStore';
import { Routes } from './Routes';
import { awsmobile } from './aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

Amplify.configure(awsmobile);

const DevTools = lazy(() =>
  process.env.NODE_ENV === 'production'
    ? (import('mobx-react-devtools') as any)
    : Promise.resolve({ default: () => null })
);

const rootStore = new RootStore(new Date());

interface IAppProps {
  path: string;
}

class App extends React.Component<IAppProps, {}> {
  state = { user: null };

  componentDidMount() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          this.setState({ user: data });
          break;
        case 'signOut':
          this.setState({ user: null });
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log('Not signed in'));
  }

  public render() {
    const { user } = this.state;
    const { path } = this.props;
    return (
      <>
        {user ? (
          <Provider rootStore={rootStore}>
            <div className="app">
              <Header path={path} />
              <Routes path={path} />
              <Suspense fallback={null}>
                <DevTools />
              </Suspense>
            </div>
          </Provider>
        ) : (
          <div>
            <button
              onClick={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Facebook
                })
              }
            >
              Open Facebook
            </button>
          </div>
        )}
      </>
    );
  }
}

export default App;
