import { IClient } from 'clients/IClient';
import React from 'react';
import { Clients } from 'test/data';
import { renderWithProviders } from 'test/utils';
import { ClientList } from './ClientList';

const expectClient = (
  element: HTMLElement,
  { fullName, email, phoneNumber }: IClient
) => {
  expect(element.innerHTML).toIncludeMultiple([fullName, email, phoneNumber]);
};

it('renders selectable list of clients', () => {
  const {
    getByTestId,
    container,
    rootStore: { clientStore, clientSelectionModel }
  } = renderWithProviders(<ClientList />);
  expect(container.innerHTML).not.toIncludeMultiple([
    Clients.Martin.fullName,
    Clients.Leonard.fullName
  ]);
  clientStore.create(Clients.Leonard);
  const martin = clientStore.create(Clients.Martin);
  expectClient(container, Clients.Leonard);
  expectClient(container, Clients.Martin);
  clientSelectionModel.select(martin);
  const selectedClient = getByTestId('selected-list-item');
  expect(selectedClient.innerHTML).toInclude(Clients.Martin.fullName);
  expect(selectedClient.innerHTML).not.toInclude(Clients.Leonard.fullName);
});
