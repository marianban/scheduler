import * as React from 'react';
import { Calendar } from './Calendar';

const LeftPane = () => {
  return (
    <aside className="app__left-pane">
      <Calendar />
    </aside>
  );
};

export default LeftPane;
