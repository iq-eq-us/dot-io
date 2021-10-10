import React, { ReactElement } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import Manager from '../pages/manager/manager'
import Navbar from './navbar';
import Training from '../pages/training/training';
import { ClosingPrompt } from './closingPrompt';

export const ROUTER_PATHS = {
  home: '/',
  training: '/training',
  manager: '/manager',
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
        This is responsible for prompting the user if they try and leave the training page and don't have Auto Save enabled in the settings, so they don't lose their progress.
        It also saves their progress when they navigate away if they do have Auto Save enabled.
      */}
      <ClosingPrompt />

      <Switch>
        {/* This is the route to the dashboard page. */}
        <Route path={ROUTER_PATHS.home} exact>
          <Navbar />
          <Dashboard />
        </Route>

        {/* This is the route to the training page, which will adapt depending on which training scenario is active. */}
        {/* You can find the active training scenario in the state.ts file inside the trainingStore, specifically the currentTrainingScenario state variable */}
        <Route path={ROUTER_PATHS.training}>
          <Navbar />
          <Training />
        </Route>

        {/* This is the route to the training page, which will adapt depending on which training scenario is active. */}
        {/* You can find the active training scenario in the state.ts file inside the trainingStore, specifically the currentTrainingScenario state variable */}
        <Route path={ROUTER_PATHS.manager}>
          <Navbar />
          <Manager/>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;
