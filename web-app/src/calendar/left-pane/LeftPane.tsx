import * as React from 'react';
import { Calendar } from './Calendar';
import NextAppointments from './NextAppointments'

const LeftPane = () => {
  return (
    <aside className="app__left-pane">
      <Calendar />
      <NextAppointments />
    </aside>
  );
};

export default LeftPane;
