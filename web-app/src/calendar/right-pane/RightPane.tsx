import { Button } from 'components/Button';
import { TextField } from 'components/Field';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RootStore } from 'RootStore';
import CalendarIcon from './calendar-alt-regular.svg';
import ClockIcon from './clock-regular.svg';
import './RightPane.css';

interface IProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export class RightPane extends React.Component<
  IProps,
  { client: { fullName: string; phoneNumber: string; email: string } }
> {
  public render() {
    return (
      <aside className="app__right-pane">
        <div className="app__right-pane__controls">
          <Button className="btn--secondary">Delete</Button>
        </div>
        <h2>Client</h2>
        <TextField title="Full Name" name="fullName" />
        <TextField title="Email" name="email" />
        <TextField title="Phone Number" name="phoneNumber" />
        <h2>Appointment</h2>
        <div className="grid-col-2">
          <TextField
            title="Date"
            suffix={<CalendarIcon className="appointment__calendar-icon" />}
          />
          <TextField
            title="Time"
            suffix={<ClockIcon className="appointment__calendar-icon" />}
          />
        </div>
        <TextField title="Services" />
      </aside>
    );
  }
}

export default RightPane;
