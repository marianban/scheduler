import { configure } from 'mobx';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress/nprogress.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// tslint:disable-next-line:ordered-imports
import './index.css';
// tslint:disable-next-line:ordered-imports
import './reset.css';
import './variables.css';
import * as serviceWorker from './serviceWorker';

configure({
  enforceActions: 'always'
});

const renderApp = (path: string) =>
  ReactDOM.render(<App path={path} />, document.getElementById(
    'root'
  ) as HTMLElement);

renderApp(window.location.pathname);

window.addEventListener('popstate', () => {
  NProgress.start();
  renderApp(window.location.pathname);
  setTimeout(() => {
    NProgress.done();
  }, 250);
});

serviceWorker.unregister();
