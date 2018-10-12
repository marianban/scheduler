import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { Button } from 'components/Button';
import { ButtonLink } from 'components/ButtonLink';
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
  client?: ClientModel;
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

  public render() {
    const {
      form: { fullName, phoneNumber, email },
      client
    } = this.state;
    return (
      <aside className="app__right-pane">
        <div className="grid-col-2">
          <h2 className="app__right-pane__h">Client</h2>
          <ButtonLink
            className="h__btn-link app__right-pane__h"
            onClick={this.handleOnNewClientClick}
            disabled={!client}
          >
            new client
          </ButtonLink>
        </div>
        <TextField
          title="Full Name"
          name="fullName"
          value={fullName}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Email"
          name="email"
          value={email}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
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
        <div className="pane__bottom">
          <Button className="btn--secondary">Cancel Appointment</Button>
        </div>
      </aside>
    );
  }

  private handleOnNewClientClick = () => {
    this.setState({
      client: undefined,
      form: {
        fullName: '',
        email: '',
        phoneNumber: ''
      }
    });
  };

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
    const { form, client } = this.state;
    if (client && client.equals(form)) {
      client.update(form);
    } else {
      const { fullName, email, phoneNumber } = form;
      const newClient = new ClientModel(fullName, phoneNumber, email);
      clientStore.create(newClient);
      this.setState({
        client: newClient
      });
    }
  };
}

export default RightPane;
