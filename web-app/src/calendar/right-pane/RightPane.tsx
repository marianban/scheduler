import { Button } from 'components/Button';
import { TextField } from 'components/Field';
import * as React from 'react';
import CalendarIcon from './calendar-alt-regular.svg';
import ClockIcon from './clock-regular.svg'
import './RightPane.css';

const RightPane = () => {
  return (
    <aside className="app__right-pane grid-col-2">
      <div className="grid-col-span-2 app__right-pane__controls">
        <Button className="btn--secondary">Delete</Button>
      </div>
      <h2 className="grid-col-span-2">Client</h2>
      <TextField title="First Name" />
      <TextField title="Last Name" />
      <TextField title="Email" />
      <TextField title="Telephone" />
      <h2 className="grid-col-span-2">Appointment</h2>
      <TextField title="Date" suffix={<CalendarIcon className="appointment__calendar-icon" />} />
      <TextField title="Time" suffix={<ClockIcon className="appointment__calendar-icon" />} />
      <TextField title="Services" />
    </aside>
  );
};

export default RightPane;
