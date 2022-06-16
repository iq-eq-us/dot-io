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

// The main app component provides the store to the rest of the application, and renders the router
const App = (): ReactElement => {
  return (
    // Inject the main application store into the application
    <StoreProvider store={store}>
      {/* Don't render the router component until the store has finished hydrating its state from storage */}
      <WaitForStateRehydration>
        {/* Finally, render out the router, which contains all the application's pages, once the store has been hydrated */}
        <Router />
      </WaitForStateRehydration>
    </StoreProvider>
  );
};

export default App;
