import React from 'react';
import { Clients } from 'test/data';
import { renderWithProviders } from 'test/utils';
import { ClientRightPane } from './ClientRightPane';
import { IClient } from './IClient';

const renderRightPane = () => {
  const result = renderWithProviders(<ClientRightPane />);
  const { getByLabelText, getByTestId } = result;
  return {
    ...result,
    fullName: getByLabelText(/Full Name/i) as HTMLInputElement,
    email: getByLabelText(/Email/i) as HTMLInputElement,
    phoneNumber: getByLabelText(/Phone Number/i) as HTMLInputElement,
    newClientBtn: getByTestId('new-client-btn')
  };
};

const expectClient = (
  {
    fullName,
    email,
    phoneNumber
  }: {
    fullName: HTMLInputElement;
    email: HTMLInputElement;
    phoneNumber: HTMLInputElement;
  },
  client: IClient
) => {
  expect(fullName.value).toBe(client.fullName);
  expect(email.value).toBe(client.email);
  expect(phoneNumber.value).toBe(client.phoneNumber);
};

it('renders selected client', () => {
  const result = renderRightPane();
  const { rootStore } = result;
  const { clientSelectionModel, clientStore } = rootStore;
  expect(clientSelectionModel.selectedClient).toBeNull();
  expect(clientStore.clients).toBeEmpty();
  clientStore.create(Clients.Leonard);
  clientStore.create(Clients.Martin);
  expect(clientSelectionModel.selectedClient).not.toBeNull();
  expectClient(result, Clients.Leonard);
});

it('can update selected client', () => {
  const result = renderRightPane();
  const { rootStore, fullName, email, phoneNumber, type } = result;
  const { clientStore } = rootStore;
  clientStore.create(Clients.Leonard);
  expectClient(result, Clients.Leonard);
  type(fullName, Clients.Martin.fullName);
  type(email, Clients.Martin.email);
  type(phoneNumber, Clients.Martin.phoneNumber);
  expectClient(result, Clients.Martin);
  const client = clientStore.getByFullName(Clients.Martin.fullName);
  expect(client.email).toBe(Clients.Martin.email);
  expect(client.phoneNumber).toBe(Clients.Martin.phoneNumber);
});

it('can create new client', () => {
  const result = renderRightPane();
  const {
    rootStore,
    newClientBtn,
    fireEvent,
    fullName,
    email,
    phoneNumber,
    type
  } = result;
  const { clientStore } = rootStore;
  expect(newClientBtn).toBeDisabled();
  clientStore.create(Clients.Leonard);
  expect(clientStore.clients).toHaveLength(1);
  expect(newClientBtn).not.toBeDisabled();
  expectClient(result, Clients.Leonard);
  fireEvent.click(newClientBtn);
  expect(newClientBtn).toBeDisabled();
  expectClient(result, Clients.Empty);
  type(fullName, Clients.Martin.fullName);
  type(email, Clients.Martin.email);
  type(phoneNumber, Clients.Martin.phoneNumber);
  expect(clientStore.clients).toHaveLength(2);
  expect(newClientBtn).not.toBeDisabled();
});

it('can delete client', () => {
  const result = renderRightPane();
  const { rootStore } = result;
  const { clientStore } = rootStore;
  clientStore.create(Clients.Leonard);
});
