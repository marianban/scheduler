import { IClient } from 'clients/IClient';
import * as React from 'react';
import { fireEvent } from 'react-testing-library';
import { RootStore } from 'RootStore';
import { Clients } from 'test/data';
import { renderWithProviders } from 'test/utils';
import { RightPane } from './RightPane';

type Duration = HTMLElement & {
  getSelected: () => any;
  getByValue: (value: any) => any;
};

interface ClientForm {
  fullName: HTMLInputElement;
  email: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  type: (element: HTMLElement, value: string) => void;
}

interface AppointmentForm {
  date: HTMLInputElement;
  time: HTMLInputElement;
  duration: Duration;
  type: (element: HTMLElement, value: string) => void;
}

const renderRightPane = () => {
  const rootStore = new RootStore(new Date());
  const result = renderWithProviders(<RightPane rootStore={rootStore} />);
  const { getByLabelText, getByTestId, getAllByTestId } = result;
  const fullName = getByLabelText(/full name/i) as HTMLInputElement;
  const email = getByLabelText(/email/i) as HTMLInputElement;
  const phoneNumber = getByLabelText(/phone number/i) as HTMLInputElement;
  const date = getByLabelText(/date/i) as HTMLInputElement;
  const time = getByLabelText(/time/i) as HTMLInputElement;
  const btnNewClient = getByTestId('new-client-btn');
  const btnCancelAppointment = getByTestId('cancel-appointment');
  const btnNewAppointment = getByTestId('new-appointment');
  const duration = getByTestId('duration');
  const getAllByTestIdQuery = getAllByTestId as any;
  return {
    ...result,
    rootStore,
    form: {
      fullName,
      email,
      phoneNumber,
      btnNewClient,
      btnNewAppointment,
      date,
      time,
      btnCancelAppointment,
      duration: {
        ...duration,
        getSelected: () =>
          (getAllByTestIdQuery('btn-bar-option') as any).find(
            (e: HTMLElement) => e.getAttribute('data-selected') === 'true'
          ),
        getByValue: (value: any) =>
          (getAllByTestIdQuery('btn-bar-option') as any).find(
            (e: HTMLElement) =>
              e.getAttribute('data-value') === value.toString()
          )
      },
      type: (element: HTMLElement, value: string) => {
        fireEvent.change(element, { target: { value } });
        fireEvent.blur(element);
      }
    }
  };
};

const typeClient = (
  { fullName, email, phoneNumber, type }: ClientForm,
  client: IClient
) => {
  type(fullName, client.fullName);
  type(email, client.email);
  type(phoneNumber, client.phoneNumber);
};

const expectEmptyClient = ({ fullName, email, phoneNumber }: ClientForm) => {
  expect(fullName).toBeEmpty();
  expect(email).toBeEmpty();
  expect(phoneNumber).toBeEmpty();
};

const expectClient = (
  { fullName, email, phoneNumber }: ClientForm,
  client: IClient
) => {
  expect(fullName.value).toBe(client.fullName);
  expect(email.value).toBe(client.email);
  expect(phoneNumber.value).toBe(client.phoneNumber);
};

const expectEmptyAppointment = ({ date, time, duration }: AppointmentForm) => {
  expect(date).toBeEmpty();
  expect(time).toBeEmpty();
  expect(duration.getSelected()).toHaveTextContent('30 min');
};

it('creates new client when new name is entered', () => {
  const {
    rootStore,
    form: { fullName, type, btnNewClient }
  } = renderRightPane();
  const clientName = Clients.Leonard.fullName;
  expect(btnNewClient).toBeDisabled();
  type(fullName, clientName);
  expect(btnNewClient).not.toBeDisabled();
  expect(rootStore.clientStore.exists({ fullName: clientName })).toBe(true);
  expect(rootStore.clientStore.clients).toHaveLength(1);
});

it('loads and updates existing client if the name matches', () => {
  const { rootStore, form } = renderRightPane();
  rootStore.clientStore.create(Clients.Martin);
  typeClient(form, Clients.Martin);
  expect(rootStore.clientStore.clients).toHaveLength(1);
  expectClient(form, Clients.Martin);
});

it('replaces existing client form with new client', () => {
  const {
    rootStore,
    form,
    form: { fullName, email, phoneNumber, type }
  } = renderRightPane();
  rootStore.clientStore.create(Clients.Martin);
  type(fullName, Clients.Martin.fullName);
  expectClient(form, Clients.Martin);

  const clientName = Clients.Leonard.fullName;
  type(fullName, clientName);
  expect(rootStore.clientStore.exists({ fullName: clientName })).toBe(true);
  expect(email).toBeEmpty();
  expect(phoneNumber).toBeEmpty();
  expect(rootStore.clientStore.clients).toHaveLength(2);
});

it('creates/updates new appointment when date and time is entered', () => {
  const {
    rootStore,
    form: { type, date, time }
  } = renderRightPane();
  const { appointmentsModel } = rootStore;
  type(date, '20.10.2018');
  expect(appointmentsModel.appointments).toHaveLength(0);
  type(time, '10:30');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(date.value).toBe('20/10/2018');

  // updates
  type(date, '2.3.2019');
  type(time, '10:00');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].dateTime).toMatchInlineSnapshot(
    `2019-03-02T09:00:00.000Z`
  );
});

it('assigns client to appointment', () => {
  const {
    rootStore,
    form: { type, date, time, fullName }
  } = renderRightPane();
  const { appointmentsModel, clientStore } = rootStore;

  // creates appointment
  type(date, '20/10/2018');
  type(time, '10:30');

  // creates first client
  type(fullName, Clients.Martin.fullName);
  expect(clientStore.clients).toHaveLength(1);
  const client = clientStore.clients[0];
  expect(client.fullName).toBe(Clients.Martin.fullName);
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].clientId).toBe(client.id);

  // creates second client
  type(fullName, Clients.Leonard.fullName);
  expect(clientStore.clients).toHaveLength(2);
  const secondClient = clientStore.getByFullName(Clients.Leonard.fullName);
  expect(secondClient.fullName).toBe(Clients.Leonard.fullName);
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].clientId).toBe(secondClient.id);

  // switches back to first client
  type(fullName, Clients.Martin.fullName);
  expect(clientStore.clients).toHaveLength(2);
  expect(client.fullName).toBe(Clients.Martin.fullName);
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].clientId).toBe(client.id);
});

it('appointment cancellation', () => {
  const {
    rootStore,
    form,
    form: {
      type,
      date,
      time,
      fullName,
      btnCancelAppointment,
      btnNewAppointment,
      btnNewClient
    }
  } = renderRightPane();
  const { appointmentsModel } = rootStore;
  expect(btnCancelAppointment).toBeDisabled();
  expect(btnNewAppointment).toBeDisabled();
  type(fullName, Clients.Leonard.fullName);
  type(date, '20/10/2018');
  type(time, '10:30');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(btnCancelAppointment).not.toBeDisabled();
  expect(btnNewAppointment).not.toBeDisabled();
  expect(btnNewClient).not.toBeDisabled();
  fireEvent.click(btnCancelAppointment);
  expect(btnCancelAppointment).toBeDisabled();
  expect(btnNewAppointment).toBeDisabled();
  expect(btnNewClient).toBeDisabled();
  expectEmptyAppointment(form);
  expectEmptyClient(form);
  expect(appointmentsModel.appointments).toHaveLength(0);
});

it('new appointment creation', () => {
  const {
    form,
    form: { type, date, time, fullName, btnNewAppointment, btnNewClient },
    rootStore
  } = renderRightPane();
  const { appointmentsModel } = rootStore;
  expect(btnNewAppointment).toBeDisabled();
  type(date, '20/10');
  type(time, '10');
  type(fullName, 'Leonard Ban');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(btnNewClient).not.toBeDisabled();
  expect(btnNewAppointment).not.toBeDisabled();
  fireEvent.click(btnNewAppointment);
  expect(btnNewAppointment).toBeDisabled();
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(btnNewClient).toBeDisabled();
  expectEmptyClient(form);
  expectEmptyAppointment(form);
});

it('can specify duration', () => {
  const {
    form: { duration, type, date, time },
    rootStore
  } = renderRightPane();
  const { appointmentsModel } = rootStore;
  type(date, '20/10');
  type(time, '10:00');
  expect(appointmentsModel.appointments).toHaveLength(1);
  const appointment = appointmentsModel.appointments[0];
  expect(duration.getSelected()).toHaveTextContent('30 min');
  expect(appointment.duration).toBe(30);
  const duration60 = duration.getByValue(60);
  fireEvent.click(duration60);
  expect(duration.getSelected()).toHaveTextContent('60 min');
  expect(appointment.duration).toBe(60);
});

it('shows selected appointment', () => {
  const {
    form,
    form: { duration, date, time },
    rootStore
  } = renderRightPane();
  const { appointmentsModel, clientStore } = rootStore;
  const leonard = clientStore.create(Clients.Leonard);
  const meetLeo = appointmentsModel.create({
    date: '20/10/2018',
    time: '14:00',
    duration: 30,
    clientId: leonard.id
  });
  const meetMartin = appointmentsModel.create({
    date: '23/10/2018',
    time: '10:30',
    duration: 60
  });
  expect(duration.getSelected()).toHaveTextContent('30 min');
  expectEmptyAppointment(form);
  expectEmptyClient(form);
});
