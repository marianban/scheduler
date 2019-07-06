import { Provider } from 'mobx-react';
import React, { lazy, Suspense } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import './App.css';
import Header from './header/Header';
import { RootStore } from './RootStore';
import { Routes } from './Routes';
import * as awsmobile from './aws-exports';
import { getUser, createUser } from 'GraphQLOperations';
import { UserRole } from 'API';
import { CurrentUser } from 'models/CurrentUser';

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
  user: CurrentUser | null;
}

export const UserContext = React.createContext<CurrentUser | null>(null);

class App extends React.Component<IAppProps, IAppState> {
  state = { user: null };

  componentDidMount() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          Auth.currentAuthenticatedUser()
            .then(this.initUser)
            .catch(e => console.log('Not signed in', e));
          break;
        case 'signOut':
          this.setState({ user: null });
          break;
      }
    });
  }

  private initUser = async (user: any) => {
    const getUserInput = { id: user.attributes.sub };
    debugger;
    const result = await getUser(getUserInput);
    if (result.getUser) {
      this.setState({
        user: {
          id: result.getUser.id,
          fullName: result.getUser.username,
          email: result.getUser.email,
          createdAt: result.getUser.createdAt,
          role: result.getUser.role
        }
      });
    } else {
      this.registerUser(getUserInput.id, user);
    }
  };

  private registerUser = async (id: any, user: any) => {
    const createUserResult = await createUser({
      id,
      username: user.attributes.name,
      email: user.attributes.email,
      createdAt: new Date().toISOString(),
      role: UserRole.admin
    });
    if (createUserResult.createUser) {
      this.setState({
        user: {
          id: createUserResult.createUser.id,
          fullName: createUserResult.createUser.username,
          email: createUserResult.createUser.email,
          createdAt: createUserResult.createUser.createdAt,
          role: createUserResult.createUser.role
        }
      });
    } else {
      throw new Error('Unable to register user');
    }
  };

  public render() {
    const { user } = this.state;
    const { path } = this.props;
    return (
      <Provider rootStore={rootStore}>
        <UserContext.Provider value={user}>
          <div className="app">
            <Header path={path} user={user} />
            <Routes path={path} />
            <Suspense fallback={null}>
              <DevTools />
            </Suspense>
          </div>
        </UserContext.Provider>
      </Provider>
    );
  }
}

export default App;
