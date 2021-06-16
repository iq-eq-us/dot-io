import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Test from './pages/alternateDashboard';
import './assets/global.css';
import Navbar from './components/navbar';
import Training from './pages/training/training'

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>  
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
    </Router>
  );
}

export default App;
