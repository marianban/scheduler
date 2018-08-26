import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <nav className="header__nav"></nav>
        </header>
        <aside className="app__left-pane">
        </aside>
        <aside className="app__right-pane">
        </aside>
        <main className="app__main-pane">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </main>
      </div>
    );
  }
}

export default App;
