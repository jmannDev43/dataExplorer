import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// import path from 'path';

import Layout from './components/Layout.js';
import DataExplorer from './components/DataExplorer.js';
import SchemaSetup from './components/SchemaSetup.js';
import NotFound from './components/NotFound.js';

// const schemaFileExists = () => {
//   const exists = path.exists(`${process.cwd()}/dbSchema.js`);
//   console.log(exists);
//   return false;
// };

// const indexRouteComponent = schemaFileExists() ? DataExplorer : SchemaSetup;
//
// const getIndexRouteComponent = () => {
//   request('http://localhost:9000/schemaFileExists', (err, res, body) => {
//     console.log('err', err);
//     console.log('res', res);
//     console.log('body', body);
//     const schemaFileExists = res.body === 'true';
//     const indexRouteComponent = schemaFileExists ? DataExplorer : SchemaSetup;
//     return indexRouteComponent;
//   });
// };

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
