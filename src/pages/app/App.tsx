import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import React, { ReactElement } from 'react';
import Router from '../../components/router';
import store from '../../store/store';

interface Props {
  children: ReactElement;
}

function WaitForStateRehydration({ children }: Props) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

const App = (): ReactElement => {
  return (
    <StoreProvider store={store}>
      <WaitForStateRehydration>
        <Router />
      </WaitForStateRehydration>
    </StoreProvider>
  );
};

export default App;
