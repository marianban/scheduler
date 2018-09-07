import * as React from 'react';
import { Calendar } from './Calendar';
import './calendar.css';

const LeftPane = () => {
  return (
    <aside className="app__left-pane">
      <Calendar />
    </aside>
  );
};

export default LeftPane;
