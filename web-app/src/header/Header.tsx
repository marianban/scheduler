import classNames from 'classnames';
import { Link } from 'components/Link';
import { TextBox } from 'components/TextBox';
import React from 'react';
import BellIcon from './bell-regular.svg';
import './Header.css';
import SearchIcon from './search-solid.svg';

interface IHeaderProps {
  path: string;
}

const Header = ({ path }: IHeaderProps) => (
  <header className="app__header">
    <nav className="header__nav">
      <Link
        href="/"
        title="Calendar"
        className={classNames('header__nav__calendar', {
          'header__nav__item--active': path === '/'
        })}
      >
        Calendar
      </Link>
      <Link
        href="/clients"
        title="Clients"
        className={classNames('header__nav__clients', {
          'header__nav__item--active': path === '/clients'
        })}
      >
        Clients
      </Link>
    </nav>
    <div className="header__utils">
      <TextBox suffix={<SearchIcon className="appointment__calendar-icon" />} />
      <BellIcon />
      <div className="dropdown">Majo</div>
    </div>
  </header>
);

export default Header;
