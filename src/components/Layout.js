import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { pinkA700, black } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto Slab, sans-serif',
  palette: {
    textColor: black,
    primary1Color: pinkA700,
    accent1Color: pinkA700,
  },
});

class Layout extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="Data Explorer"/>
          <div className="container-full">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
