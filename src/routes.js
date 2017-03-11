import React from 'react';
import { Router, Route } from 'react-router';

import Layout from './layout/Layout.js';
import NotFound from './components/NotFound.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Layout} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;