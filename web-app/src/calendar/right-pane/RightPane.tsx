import { AppointmentModel } from 'appointments/AppointmentModel';
import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { Button } from 'components/Button';
import { ButtonBarField, Option } from 'components/ButtonBarField';
import { ButtonLink } from 'components/ButtonLink';
import { TextField } from 'components/TextField';
import { TypeaheadField } from 'components/TypeaheadField';
import { observe } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RootStore } from 'RootStore';
import { normalizeDate, normalizeTime } from 'utils/dateTimeUtils';
import CalendarIcon from './calendar-alt-regular.svg';
import ClockIcon from './clock-regular.svg';
import './RightPane.css';

interface IProps {
  rootStore?: RootStore;
}

interface IState {
  form: Pick<IClient, keyof IClient> & {
    date: string;
    time: string;
    duration: number;
  };
  client?: ClientModel;
  appointment?: AppointmentModel;
}

const DEFAULT_DURATION: number = 30;

@inject('rootStore')
@observer
export class RightPane extends React.Component<IProps, IState> {
  public readonly state: IState = {
    form: {
      fullName: '',
      phoneNumber: '',
      email: '',
      date: '',
      time: '',
      duration: DEFAULT_DURATION
    }
  };

  public componentDidMount() {
    const rootStore = this.getRootStore();
    const { appointmentsModel } = rootStore;
    observe(appointmentsModel.selectedAppointmentId, appointmentId => {
      if (appointmentId.newValue !== null) {
        const appointment = appointmentsModel.findById(appointmentId.newValue);
        this.setState({
          form: {
            date: appointment.getDate(),
            time: appointment.getTime(),
            duration: appointment.duration,
            fullName: appointment.getClientFullName(rootStore),
            email: appointment.getClientEmail(rootStore),
            phoneNumber: appointment.getClientPhoneNumber(rootStore)
          }
        });
      } else {
        this.clearAppointmentForm();
      }
    });
  }

  public render() {
    const {
      form: { fullName, phoneNumber, email, date, time, duration },
      client,
      appointment
    } = this.state;

    const { clientStore } = this.getRootStore();
    return (
      <aside className="app__right-pane">
        <div className="grid-col-2">
          <h2 className="app__right-pane__h">Appointment</h2>
          <ButtonLink
            className="h__btn-link app__right-pane__h"
            onClick={this.handleOnNewAppointmentClick}
            data-testid="new-appointment"
            disabled={!appointment}
          >
            new
          </ButtonLink>
        </div>
        <div className="grid-col-2">
          <TextField
            name="date"
            title="Date"
            value={date}
            suffix={<CalendarIcon className="appointment__calendar-icon" />}
            onChange={this.handleOnChange}
            onBlur={this.handleOnDateBlur}
          />
          <TextField
            name="time"
            title="Time"
            value={time}
            suffix={<ClockIcon className="appointment__calendar-icon" />}
            onChange={this.handleOnChange}
            onBlur={this.handleOnTimeBlur}
          />
        </div>
        <ButtonBarField title="Duration" data-testid="duration">
          <Option
            isSelected={duration === 30}
            value={30}
            onClick={this.handleDurationChange}
          >
            30 min
          </Option>
          <Option
            isSelected={duration === 60}
            value={60}
            onClick={this.handleDurationChange}
          >
            60 min
          </Option>
          <Option
            isSelected={duration === 90}
            value={90}
            onClick={this.handleDurationChange}
          >
            90 min
          </Option>
        </ButtonBarField>
        <TextField title="Services" />
        <div className="grid-col-2">
          <h2 className="app__right-pane__h">Client</h2>
          <ButtonLink
            className="h__btn-link app__right-pane__h"
            onClick={this.handleOnNewClientClick}
            data-testid="new-client-btn"
            disabled={!client}
          >
            new client
          </ButtonLink>
        </div>
        <TypeaheadField
          title="Full Name"
          name="fullName"
          value={fullName}
          items={clientStore.clients}
          onChange={this.handleOnChange}
          onSelected={this.handleOnSelected}
          onBlur={this.handleClientOnBlur}
        />
        <TextField
          title="Email"
          name="email"
          value={email}
          onChange={this.handleOnChange}
          onBlur={this.handleClientOnBlur}
        />
        <TextField
          title="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={this.handleOnChange}
          onBlur={this.handleClientOnBlur}
        />
        <div className="pane__bottom">
          <Button
            className="btn--secondary"
            data-testid="cancel-appointment"
            disabled={!appointment}
            onClick={this.handleOnCancelAppointment}
          >
            Cancel Appointment
          </Button>
        </div>
      </aside>
    );
  }

  private handleDurationChange = (duration: number) => {
    this.setState(
      {
        form: {
          ...this.state.form,
          duration
        }
      },
      this.handleAppointmentOnBlur
    );
  };

  private handleOnNewClientClick = () => {
    this.setState({
      client: undefined,
      form: {
        fullName: '',
        email: '',
        phoneNumber: '',
        date: '',
        time: '',
        duration: DEFAULT_DURATION
      }
    });
  };

  private handleOnNewAppointmentClick = () => {
    this.clearAppointmentForm();
  };

  private handleOnCancelAppointment = () => {
    const { appointmentsModel } = this.getRootStore();
    appointmentsModel.unselect();
    appointmentsModel.cancel(this.state.appointment!.id);
    this.clearAppointmentForm();
  };

  private clearAppointmentForm = () => {
    this.setState({
      client: undefined,
      appointment: undefined,
      form: {
        fullName: '',
        email: '',
        phoneNumber: '',
        date: '',
        time: '',
        duration: DEFAULT_DURATION
      }
    });
  };

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name) {
      this.updateForm(event.target.name, event.target.value);
    }
  };

  private handleOnSelected = (client: ClientModel) => {
    this.setState({
      form: {
        ...this.state.form,
        fullName: client.fullName,
        email: client.email,
        phoneNumber: client.phoneNumber
      },
      client
    });
  };

  private handleClientOnBlur = () => {
    const { form, client, appointment } = this.state;
    let newClient: ClientModel;
    if (client && client.equals(form)) {
      client.update(form);
      newClient = client;
    } else {
      const { fullName, email, phoneNumber } = form;
      if (fullName) {
        const { clientStore } = this.getRootStore();
        if (clientStore.exists(form)) {
          newClient = clientStore.getByFullName(form.fullName);
          this.updateForm('fullName', newClient.fullName);
          this.updateForm('phoneNumber', newClient.phoneNumber);
          this.updateForm('email', newClient.email);
        } else {
          newClient = clientStore.create({ fullName, phoneNumber, email });
        }
        this.setState({
          client: newClient
        });
      }
    }
    if (appointment) {
      appointment.update({
        ...this.formToAppointment(),
        clientId: newClient!.id
      });
    }
  };

  private handleOnDateBlur = () => {
    const baseDate = new Date();
    const { form } = this.state;
    if (form.date) {
      this.updateForm(
        'date',
        normalizeDate(form.date, baseDate),
        this.handleAppointmentOnBlur
      );
    }
  };

  private handleOnTimeBlur = () => {
    const { form } = this.state;
    if (form.time) {
      this.updateForm(
        'time',
        normalizeTime(form.time),
        this.handleAppointmentOnBlur
      );
    }
  };

  private updateForm = (name: string, value: string, callback?: () => void) => {
    this.setState(
      prevState =>
        ({
          ...prevState,
          form: {
            ...prevState.form,
            [name]: value
          }
        } as Pick<IState, keyof IState>),
      callback
    );
  };

  private handleAppointmentOnBlur = () => {
    const { form, appointment } = this.state;
    if (form.date && form.time) {
      // TODO: validate date time formats
      if (appointment) {
        appointment.update(this.formToAppointment());
      } else {
        const { appointmentsModel } = this.getRootStore();
        const newAppointment = appointmentsModel.create(
          this.formToAppointment()
        );
        appointmentsModel.select(newAppointment.id);
        this.setState({
          appointment: newAppointment
        });
      }
    }
  };

  private formToAppointment = () => {
    const { form, client } = this.state;
    return {
      date: form.date,
      time: form.time,
      duration: form.duration,
      clientId: client && client.id
    };
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
