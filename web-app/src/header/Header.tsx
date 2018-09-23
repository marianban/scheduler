import { TextBox } from 'components/TextBox';
import * as React from 'react';
import Bell from './bell-regular.svg'
import './Header.css';

const Header = () => (
  <header className="app__header">
    <nav className="header__nav">
      <a
        href=""
        className="header__nav__calendar header__nav__item--active"
      >
        Calendar
      </a>
      <a href="" className="header__nav__clients">
        Clients
      </a>
      <a href="" className="header__nav__staff">
        Staff
      </a>
    </nav>
    <div className="header__utils">
      <TextBox />
      <Bell />
      <div className="dropdown">Majo</div>
    </div>
  </header>
);

export default Header;
