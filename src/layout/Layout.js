import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange500, lightBlue700, pinkA700, white} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import DataExplorer from '../components/DataExplorer.js';

import './Layout.css';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto Slab, sans-serif',
  palette: {
    accent1Color: pinkA700,
    textColor: pinkA700,
  },
});
class Layout extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar title="Data Explorer"/>
          <DataExplorer/>
          <FlatButton label="Josh" primary={true}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
