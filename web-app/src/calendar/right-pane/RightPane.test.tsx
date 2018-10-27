import * as React from 'react';
import { RootStore } from 'RootStore';
import { renderWithProviders } from 'test/utils';
import { RightPane } from './RightPane';

const rootStore = new RootStore(new Date());

it('creates client on new name', () => {
  renderWithProviders(<RightPane rootStore={rootStore} />);
});
