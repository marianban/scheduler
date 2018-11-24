import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-testing-library';
import { RootStore } from 'RootStore';

const store = new RootStore(new Date());

export const renderWithProviders = (
  ui: React.ReactElement<any>,
  rootStore = store
) => {
  return render(<Provider rootStore={rootStore}>{ui}</Provider>);
};
