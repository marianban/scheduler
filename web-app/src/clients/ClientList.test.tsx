import { IClient } from 'clients/IClient';
import React from 'react';
import { RootStore } from 'RootStore';
import { Clients } from 'test/data';
import { renderWithProviders } from 'test/utils';
import { ClientList } from './ClientList';

const expectClient = (
  element: HTMLElement,
  { fullName, email, phoneNumber }: IClient
) => {
  expect(element.innerHTML).toIncludeMultiple([fullName, email, phoneNumber]);
};

it('renders list of clients', () => {
  const rootStore = new RootStore(new Date());
  const result = renderWithProviders(<ClientList rootStore={rootStore} />);
  expect(result.container.innerHTML).not.toIncludeMultiple([
    Clients.Martin.fullName,
    Clients.Leonard.fullName
  ]);
  rootStore.clientStore.create(Clients.Leonard);
  rootStore.clientStore.create(Clients.Martin);
  expectClient(result.container, Clients.Leonard);
  expectClient(result.container, Clients.Martin);
});
