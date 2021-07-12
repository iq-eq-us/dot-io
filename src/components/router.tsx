import React, { ReactElement } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/alternateDashboard';
import Navbar from './navbar';
import Training from '../pages/training/TrainingPage';

export const ROUTER_PATHS = {
  home: '/',
  training: '/training',
};

/**
 * Currently there are two main paths in the application:
 * The main dashboard page and the training page.
 * The training page changes its functionality depending on which training mode is being used.
 */
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
