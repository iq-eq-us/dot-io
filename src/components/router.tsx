import React, { ReactElement } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import Test from '../pages/dashboard/alternateDashboard';
import Navbar from '../components/navbar';
import Training from '../pages/training/training';
import AlternateTraining from '../pages/training/alternateTraining';

export const ROUTER_PATHS = {
  home: '/',
  alphabetTraining: '/training-alphabet',
  trigramTraining: '/training-trigram',
  chordTraining: '/training-chord',
  lexicalTraining: '/training-lexical',
};

const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Switch>
        <Route path={ROUTER_PATHS.home} exact>
          <Dashboard />
        </Route>

        <Route path="/altDash">
          <Navbar />
          <Test />
        </Route>

        <Route path="/altTrain">
          <Navbar />
          <AlternateTraining />
        </Route>

        <Route path={ROUTER_PATHS.alphabetTraining}>
          <Training />
        </Route>

        <Route path={ROUTER_PATHS.trigramTraining}>
          <Training />
        </Route>

        <Route path={ROUTER_PATHS.lexicalTraining}>
          <Training />
        </Route>

        <Route path={ROUTER_PATHS.chordTraining}>
          <Training />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;
