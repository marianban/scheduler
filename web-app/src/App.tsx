import { GetUserQuery, UserRole } from 'API';
import { Application } from 'Application';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { createUser, getUser, updateUser } from 'GraphQLOperations';
import { Provider } from 'mobx-react';
import { CurrentUser } from 'models/CurrentUser';
import React, { lazy, Suspense } from 'react';
import { Routes } from 'Routes';
import './App.css';
import * as awsmobile from './aws-exports';
import Header from './header/Header';
import { RootStore } from './RootStore';

Amplify.configure((awsmobile as any).default);

const DevTools = lazy(() =>
  process.env.NODE_ENV === 'production'
    ? (import('mobx-react-devtools') as any)
    : Promise.resolve({ default: () => null })
);

const rootStore = new RootStore(new Date());
const application = new Application(rootStore);

interface IAppProps {
  path: string;
}

interface IAppState {
  user: CurrentUser | null;
}

export const UserContext = React.createContext<CurrentUser | null>(null);

class App extends React.Component<IAppProps, IAppState> {
  application: Application | null = null;
  state = { user: null };

  async componentDidMount() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('signed in');
          this.setAuthenticatedUser();
          break;
        case 'signOut':
          this.setState({ user: null });
          application.disconnectBackend();
          break;
      }
    });
    await this.setAuthenticatedUser();
  }

  private setAuthenticatedUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then(this.initUser)
      .catch(e => console.log('Not signed in', e));
  };

  private initUser = async (user: any) => {
    const getUserInput = { id: user.attributes.sub };
    const result = await getUser(getUserInput);
    const identities = JSON.parse(user.attributes.identities);
    const facebookIdentity = identities.find(
      (i: any) => i.providerName === 'Facebook'
    );
    if (!facebookIdentity) {
      throw new Error('unable to find facebook identity');
    }
    if (result.getUser) {
      await this.connectFacebookIdentity(result, facebookIdentity);
    } else {
      await this.registerUser(getUserInput.id, user, facebookIdentity);
    }
    await application.connectBackend();
  };

  private connectFacebookIdentity = async (
    userQuery: GetUserQuery,
    facebookIdentity: any
  ) => {
    if (userQuery.getUser!.facebookUserId !== null) {
      this.setState({
        user: {
          id: userQuery.getUser!.id,
          fullName: userQuery.getUser!.fullName,
          email: userQuery.getUser!.email || '',
          createdAt: userQuery.getUser!.createdAt,
          role: userQuery.getUser!.role,
          facebookUserId: userQuery.getUser!.facebookUserId,
          phoneNumber: userQuery.getUser!.phoneNumber || ''
        }
      });
      return Promise.resolve();
    }

    const updateUserResult = await updateUser({
      id: userQuery.getUser!.id,
      fullName: userQuery.getUser!.fullName,
      email: userQuery.getUser!.email,
      createdAt: userQuery.getUser!.createdAt,
      role: userQuery.getUser!.role,
      facebookUserId: facebookIdentity.userId
    });
    if (updateUserResult.updateUser) {
      this.setState({
        user: {
          id: updateUserResult.updateUser.id,
          fullName: updateUserResult.updateUser.fullName,
          email: updateUserResult.updateUser.email || '',
          phoneNumber: updateUserResult.updateUser.phoneNumber || '',
          createdAt: updateUserResult.updateUser.createdAt,
          role: updateUserResult.updateUser.role,
          facebookUserId: updateUserResult.updateUser.facebookUserId
        }
      });
    } else {
      throw new Error('Unable to register user');
    }
  };

  private registerUser = async (id: any, user: any, facebookIdentity: any) => {
    const createUserResult = await createUser({
      id,
      fullName: user.attributes.name,
      email: user.attributes.email,
      phoneNumber: '0908000000',
      createdAt: new Date().toISOString(),
      role: UserRole.admin,
      facebookUserId: facebookIdentity.userId
    });
    if (createUserResult.createUser) {
      this.setState({
        user: {
          id: createUserResult.createUser.id,
          fullName: createUserResult.createUser.fullName,
          email: createUserResult.createUser.email || '',
          phoneNumber: createUserResult.createUser.phoneNumber || '',
          createdAt: createUserResult.createUser.createdAt,
          role: createUserResult.createUser.role,
          facebookUserId: createUserResult.createUser.facebookUserId
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
            <ErrorBoundary>
              <Routes path={path} />
            </ErrorBoundary>
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
