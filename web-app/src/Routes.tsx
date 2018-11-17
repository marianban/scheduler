import { Calendar } from 'calendar/Calendar';
import React from 'react';

interface IRoutesProps {
  path: string;
}

const routeMap = {
  '/': Calendar
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
