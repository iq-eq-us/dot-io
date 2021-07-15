import React, { ReactElement } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import Navbar from './navbar';
import Training from '../pages/training/training';
import { ClosingPrompt } from './closingPrompt';

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
      {/* 
        This is responsible for prompting the user if they try and leave the page and don't have Auto Save enabled in the settings, so they don't lose their progress.
        It also saves their progress when they navigate away if they do have Auto Save enabled.
      */}
      <ClosingPrompt />

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
