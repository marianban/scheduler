import { getDaysInMonth } from 'date-fns';
import * as React from 'react';

const range = (count: number) => Array.from({ length: count }, (v, k) => k + 1);

const LeftPane = () => {
  return (
    <aside className="app__left-pane" >
      August 2018
      {range(getDaysInMonth(new Date())).map((day: number) => day)}
    </aside>
  );
};

export default LeftPane;