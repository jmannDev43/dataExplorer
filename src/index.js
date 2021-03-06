import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/index.css';
import './styles/bootstrap.min.css';

import Routes from './routes';

injectTapEventPlugin();

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root'),
);
