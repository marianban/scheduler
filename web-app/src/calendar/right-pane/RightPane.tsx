import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
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

interface IState {
  form: Pick<IClient, keyof IClient>;
}

@inject('rootStore')
@observer
export class RightPane extends React.Component<IProps, IState> {
  public readonly state: IState = {
    form: {
      fullName: '',
      phoneNumber: '',
      email: ''
    }
  };

  private client?: ClientModel;

  public render() {
    return (
      <aside className="app__right-pane">
        <div className="app__right-pane__controls">
          <Button className="btn--secondary">Cancel Appointment</Button>
        </div>
        <h2>Client - clear</h2>
        <TextField
          title="Full Name"
          name="fullName"
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Email"
          name="email"
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Phone Number"
          name="phoneNumber"
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
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

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name) {
      this.setState({
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value
        }
      } as Pick<IState, keyof IState>);
    }
  };

  private handleOnBlur = () => {
    const rootStore = this.props.rootStore!;
    const { clientStore } = rootStore;
    const { form } = this.state;
    const { client } = this;
    if (client && client.equals(form)) {
      client.update(form);
    } else {
      const { fullName, email, phoneNumber } = form;
      const newClient = new ClientModel(fullName, phoneNumber, email);
      clientStore.create(newClient);
      this.client = newClient;
    }
  };
}

export default RightPane;
