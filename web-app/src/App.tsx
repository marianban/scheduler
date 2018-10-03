import * as React from 'react';
import './App.css';
import { Calendar } from './calendar/Calendar';
import Header from './header/Header';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Header />
        <Calendar />
      </div>
    );
  }
}

export default App;
