import { Provider } from 'mobx-react';
import * as React from 'react';
import { render } from 'react-testing-library';
import { RootStore } from 'RootStore';

const rootStore = new RootStore(new Date());

export const renderWithProviders = (ui: React.ReactElement<any>) => {
  return render(<Provider rootStore={rootStore}>{ui}</Provider>);
};
