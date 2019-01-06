import { AppointmentModel } from 'appointments/AppointmentModel';
import { IWorkCalendarRefreshAppointment } from 'calendar/work-calendar/WorkCalendar';
import { ClientModel } from 'clients/ClientModel';
import { IClient } from 'clients/IClient';
import { Button } from 'components/Button';
import { ButtonBarField, Option } from 'components/ButtonBarField';
import { ButtonLink } from 'components/ButtonLink';
import { TextField } from 'components/TextField';
import { TypeaheadField, IItem } from 'components/TypeaheadField';
import { ReactComponent as CalendarIcon } from 'icons/calendar-alt-regular.svg';
import { ReactComponent as ClockIcon } from 'icons/clock-regular.svg';
import { observe } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootStore } from 'RootStore';
import { normalizeDate, normalizeTime } from 'utils/dateTimeUtils';
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

  private subscriptionId?: string;

  public componentDidMount() {
    const rootStore = this.getRootStore();
    const { appointmentsModel } = rootStore;
    observe(appointmentsModel.selectedAppointmentId, appointmentId => {
      if (appointmentId.newValue !== null) {
        const appointment = appointmentsModel.findById(appointmentId.newValue);
        this.appointmentToForm(appointment);
      } else {
        this.clearAppointmentForm();
      }
    });
    this.subscriptionId = rootStore.pubSub.subscribe<
      IWorkCalendarRefreshAppointment
    >('workCalendarRefreshAppointment', this.handleRefreshAppointment);
  }

  public componentWillUnmount() {
    if (this.subscriptionId !== undefined) {
      const { pubSub } = this.getRootStore();
      pubSub.unsubscribe('workCalendarItemClick', this.subscriptionId);
    }
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
          onBlur={this.handleOnClientNameBlur}
        />
        {/* 
        <Validator
          name="fullName"
          onBlur={this.handleOnClientNameBlur}
          onValidated=""
        >
          {() => (
            <TypeaheadField
              title="Full Name"
              name="fullName"
              value={fullName}
              items={clientStore.clients}
              onChange={this.handleOnChange}
              onSelected={this.handleOnSelected}
              onBlur={this.handleOnClientNameBlur}
            />
          )}
        </Validator>
        */}
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
            Remove from Calendar
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

  private clearAppointmentForm = (callback: () => void = () => {}) => {
    this.setState(
      {
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
      },
      callback
    );
  };

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name) {
      this.updateForm(event.target.name, event.target.value);
    }
  };

  private handleOnSelected = (item: IItem) => {
    const client = item as ClientModel;
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

  private handleOnClientNameBlur = () => {
    const { form, client } = this.state;
    // TODO: ask user if new user should be created or existing updated
    if (client && !client.equals(form)) {
      this.setState(
        {
          form: {
            ...this.state.form,
            email: '',
            phoneNumber: ''
          }
        },
        () => {
          this.handleAppointmentOnBlur();
        }
      );
      this.handleClientOnBlur();
    } else {
      this.handleClientOnBlur();
    }
  };

  private handleClientOnBlur = () => {
    const { form, client, appointment } = this.state;
    let newClient: ClientModel | null = null;
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
    if (appointment && newClient !== null) {
      appointment.update({
        ...this.formToAppointment(),
        clientId: newClient.id
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

  private handleRefreshAppointment = ({
    appointmentId
  }: IWorkCalendarRefreshAppointment) => {
    const { appointment } = this.state;
    if (appointment && appointment.id === appointmentId) {
      this.appointmentToForm(appointment);
    }
  };

  private appointmentToForm = (appointment: AppointmentModel) => {
    const rootStore = this.getRootStore();
    this.setState({
      appointment,
      client: appointment.getClient(rootStore),
      form: {
        date: appointment.getDate(),
        time: appointment.getTime(),
        duration: appointment.duration,
        fullName: appointment.getClientFullName(rootStore),
        email: appointment.getClientEmail(rootStore),
        phoneNumber: appointment.getClientPhoneNumber(rootStore)
      }
    });
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
