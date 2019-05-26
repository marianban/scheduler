import { CalendarPage } from 'calendar/CalendarPage';
import { ClientsPage } from 'clients/ClientsPage';
import React from 'react';

interface IRoutesProps {
  path: string;
}

const routeMap: {
  [key: string]: React.SFC<any | void> | React.ComponentClass<any | void>;
} = {
  '/': CalendarPage,
  '/clients': ClientsPage
};

const NotFound = () => <span>Page Not Found</span>;

const renderRoute = (path: string) => {
  const Component = routeMap[path];
  if (Component === undefined) {
    return <NotFound />;
  }
  return <Component />;
};

export const Routes = ({ path }: IRoutesProps) => (
  <React.Fragment>{renderRoute(path)}</React.Fragment>
);
