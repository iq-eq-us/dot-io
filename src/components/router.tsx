import React, { ReactElement } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/alternateDashboard';
import Navbar from '../components/navbar';
import Training from '../pages/training/alternateTraining';

export const ROUTER_PATHS = {
  home: '/',
  training: '/training',
};

const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Switch>
        <Route path={ROUTER_PATHS.home} exact>
          <Navbar />
          <Dashboard />
        </Route>

        <Route path={ROUTER_PATHS.training}>
          <Navbar />
          <Training />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;
