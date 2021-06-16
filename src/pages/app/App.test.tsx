// import { render } from '@testing-library/react';
// import * as React from 'react';
// import App from './App';
import { expect } from 'chai';
import { createStore } from 'easy-peasy';
import type StoreModel from '../../models/storeModel';
import { defaultStoreState } from '../../store/store';

describe('<App>', () => {
  it('can successfully create a store', () => {
    const store = createStore<StoreModel>(defaultStoreState);
    expect(store).is.not.null;
    expect(store).is.not.undefined;
  });
});
