import { ClientModel } from 'clients/ClientModel';
import * as React from 'react';
import { fireEvent } from 'react-testing-library';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import { RightPane } from './RightPane';

const renderRightPane = () => {
  const rootStore = new RootStore(new Date());
  const result = renderWithProviders(<RightPane rootStore={rootStore} />);
  const { getByLabelText } = result;
  const fullName = getByLabelText(/full name/i) as HTMLInputElement;
  const email = getByLabelText(/email/i) as HTMLInputElement;
  const phoneNumber = getByLabelText(/phone number/i) as HTMLInputElement;
  return {
    ...result,
    rootStore,
    form: {
      fullName,
      email,
      phoneNumber,
      type: (element: HTMLElement, value: string) => {
        fireEvent.change(element, { target: { value } });
        fireEvent.blur(element);
      }
    }
  };
};

it('creates client when new name is entered', () => {
  const {
    rootStore,
    form: { fullName, type }
  } = renderRightPane();
  const clientName = 'Linus Torvalds';
  type(fullName, clientName);
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
