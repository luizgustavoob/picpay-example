import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Payment from './pages/Payment';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Payment} />
    </Switch>
  );
};

export default Routes;