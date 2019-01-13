import { Provider } from "mobx-react";
import React, { lazy, Suspense } from "react";
import "./App.css";
import Header from "./header/Header";
import { RootStore } from "./RootStore";
import { Routes } from "./Routes";

const DevTools = lazy(() =>
  process.env.NODE_ENV === "production"
    ? (import("mobx-react-devtools") as any)
    : Promise.resolve({ default: () => null })
);

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
          <Suspense fallback={null}>
            <DevTools />
          </Suspense>
        </div>
      </Provider>
    );
  }
}

export default App;
