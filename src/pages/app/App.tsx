import { StoreProvider } from 'easy-peasy';
import React, { ReactElement } from 'react';
import Router from '../../components/router';
import store from '../../store/store';

const App = (): ReactElement => {
  return (
    <StoreProvider store={store}>
      <Router />
    </StoreProvider>
  );
};

export default App;
