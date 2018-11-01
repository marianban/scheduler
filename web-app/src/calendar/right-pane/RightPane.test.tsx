import { ClientModel } from 'clients/ClientModel';
import * as React from 'react';
import { fireEvent } from 'react-testing-library';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import { RightPane } from './RightPane';

const renderRightPane = () => {
  const rootStore = new RootStore(new Date());
  const result = renderWithProviders(<RightPane rootStore={rootStore} />);
  const { getByLabelText, getByTestId } = result;
  const fullName = getByLabelText(/full name/i) as HTMLInputElement;
  const email = getByLabelText(/email/i) as HTMLInputElement;
  const phoneNumber = getByLabelText(/phone number/i) as HTMLInputElement;
  const date = getByLabelText(/date/i) as HTMLInputElement;
  const time = getByLabelText(/time/i) as HTMLInputElement;
  const newClientBtn = getByTestId('new-client-btn');
  return {
    ...result,
    rootStore,
    form: {
      fullName,
      email,
      phoneNumber,
      newClientBtn,
      date,
      time,
      type: (element: HTMLElement, value: string) => {
        fireEvent.change(element, { target: { value } });
        fireEvent.blur(element);
      }
    }
  };
};

it('creates new client when new name is entered', () => {
  const {
    rootStore,
    form: { fullName, type, newClientBtn }
  } = renderRightPane();
  const clientName = 'Linus Torvalds';
  expect(newClientBtn).toBeDisabled();
  type(fullName, clientName);
  expect(newClientBtn).not.toBeDisabled();
  expect(rootStore.clientStore.exists({ fullName: clientName })).toBe(true);
  expect(rootStore.clientStore.clients).toHaveLength(1);
});

it('loads and updates existing client if the name matches', () => {
  const {
    rootStore,
    form: { fullName, email, phoneNumber, type }
  } = renderRightPane();
  rootStore.clientStore.create(
    new ClientModel('Martin Folwer', '1234', 'martin@folwer')
  );
  type(fullName, 'Martin Folwer');
  type(email, 'martin@folwer.com');
  type(phoneNumber, '0908042407');
  expect(rootStore.clientStore.clients).toHaveLength(1);
  expect(email.value).toBe('martin@folwer.com');
  expect(phoneNumber.value).toBe('0908042407');
});

it('replaces existing client form with new client', () => {
  const {
    rootStore,
    form: { fullName, email, phoneNumber, type }
  } = renderRightPane();
  rootStore.clientStore.create(
    new ClientModel('Martin Folwer', '1234', 'martin@folwer')
  );
  type(fullName, 'Martin Folwer');
  expect(fullName.value).toBe('Martin Folwer');
  expect(phoneNumber.value).toBe('1234');
  expect(email.value).toBe('martin@folwer');

  const clientName = 'Linus Torvalds';
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
  type(date, '20.10.2018');
  type(time, '10:30');

  // creates first client
  type(fullName, 'Martin Folwer');
  expect(clientStore.clients).toHaveLength(1);
  const client = clientStore.clients[0];
  expect(client.fullName).toBe('Martin Folwer');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].clientId).toBe(client.id);

  // creates second client
  type(fullName, 'Linus Torvalds');
  expect(clientStore.clients).toHaveLength(2);
  const secondClient = clientStore.getByFullName('Linus Torvalds');
  expect(secondClient.fullName).toBe('Linus Torvalds');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].clientId).toBe(secondClient.id);

  // switches back to first client
  type(fullName, 'Martin Folwer');
  expect(clientStore.clients).toHaveLength(2);
  expect(client.fullName).toBe('Martin Folwer');
  expect(appointmentsModel.appointments).toHaveLength(1);
  expect(appointmentsModel.appointments[0].clientId).toBe(client.id);
});
