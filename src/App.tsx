import React, { FC } from 'react';
import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FixtureDetails from './pages/FixtureDetails';

const App: FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:fixtureID">
            <FixtureDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
