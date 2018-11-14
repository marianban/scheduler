import { configure } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// tslint:disable-next-line:ordered-imports
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// tslint:disable-next-line:ordered-imports
import './reset.css';
import './variables.css';

configure({
  enforceActions: 'always'
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
