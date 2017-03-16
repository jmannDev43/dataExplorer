import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import DataExplorer from './components/DataExplorer';
import SchemaSetup from './components/SchemaSetup';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Layout}>
      <IndexRoute component={SchemaSetup}/>
      <Route path="/schemaSetup" component={SchemaSetup}/>
      <Route path="/dataExplorer" component={DataExplorer}/>
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
