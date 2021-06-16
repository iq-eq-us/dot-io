import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import Test from '../pages/dashboard/alternateDashboard';
import Navbar from '../components/navbar';
import Training from '../pages/training/training';

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>

        <Route path="/altDash">
          <Navbar />
          <Test />
        </Route>

        <Route path="/training">
          <Training />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
