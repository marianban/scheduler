import { UserContext } from 'App';
import { Auth } from 'aws-amplify';
import classNames from 'classnames';
import { DropDownButton } from 'components/DropdownButton';
import { Link } from 'components/Link';
import { TextBox } from 'components/TextBox';
import { ReactComponent as CalendarAltIcon } from 'icons/calendar-alt-regular.svg';
import { ReactComponent as CheveronDownIcon } from 'icons/icon-cheveron-down.svg';
import { ReactComponent as SmileIcon } from 'icons/smile-regular.svg';
import React, { useContext, useState } from 'react';
import { ReactComponent as BellIcon } from './bell-regular.svg';
import './Header.css';
import { ReactComponent as SearchIcon } from './search-solid.svg';

interface IHeaderProps {
  path: string;
  user: any;
}

const Header = ({ path }: IHeaderProps) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const user = useContext(UserContext);
  return (
    <header className="app__header">
      <nav className="header__nav">
        <Link
          href="/"
          title="Calendar"
          className={classNames('header__nav__calendar', {
            'header__nav__item--active': path === '/'
          })}
        >
          <CalendarAltIcon height="15px" /> Calendar
        </Link>
        <Link
          href="/clients"
          title="Clients"
          className={classNames('header__nav__clients', {
            'header__nav__item--active': path === '/clients'
          })}
        >
          <SmileIcon height="15px" /> Clients
        </Link>
      </nav>
      <div className="header__utils">
        {user ? (
          <>
            <TextBox
              suffix={<SearchIcon className="appointment__calendar-icon" />}
            />
            <BellIcon />
            <img
              src={`https://graph.facebook.com/v3.3/${
                user.facebookUserId
              }/picture`}
              className="user__picture"
              alt={user.fullName}
            />
            <DropDownButton
              text={
                <>
                  {user.fullName} <CheveronDownIcon height="30" />
                </>
              }
            >
              <DropDownButton.Item onClick={() => Auth.signOut()}>
                <>Sign Out</>
              </DropDownButton.Item>
            </DropDownButton>
            <div
              className="dropdown"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              {showDropDown && (
                <ul className="dropdown__menu">
                  <li onClick={() => Auth.signOut()}>Sign Out</li>
                </ul>
              )}
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
