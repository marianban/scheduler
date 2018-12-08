import React from 'react';
import { Clients } from 'test/data';
import { renderWithProviders } from 'test/utils';
import { ClientRightPane } from './ClientRightPane';

const renderRightPane = () => {
  const result = renderWithProviders(<ClientRightPane />);
  const { getByLabelText } = result;
  return {
    ...result,
    fullName: getByLabelText(/Full Name/i) as HTMLInputElement,
    email: getByLabelText(/Email/i) as HTMLInputElement,
    phoneNumber: getByLabelText(/Phone Number/i) as HTMLInputElement
  };
};

test('it renders selected client', () => {
  const { rootStore, fullName, email, phoneNumber } = renderRightPane();
  const { clientSelectionModel, clientStore } = rootStore;
  expect(clientSelectionModel.selectedClient).toBeNull();
  expect(clientStore.clients).toBeEmpty();
  clientStore.create(Clients.Leonard);
  clientStore.create(Clients.Martin);
  expect(clientSelectionModel.selectedClient).not.toBeNull();
  expect(fullName.value).toBe(Clients.Leonard.fullName);
  expect(email.value).toBe(Clients.Leonard.email);
  expect(phoneNumber.value).toBe(Clients.Leonard.phoneNumber);
});
