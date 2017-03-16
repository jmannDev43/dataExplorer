import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { pinkA700, black } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto Slab, sans-serif',
  palette: {
    textColor: black,
    primary1Color: pinkA700,
    accent1Color: pinkA700,
  },
});

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  toggleDrawer = () => {
    const open = !this.state.open;
    this.setState({ open });
  }
  closeDrawerIfOpen = () => {
    if (this.state.open){
      this.setState({ open: false });
    }
  }
  navigateToSchemaSetup = () => {
    browserHistory.push({
      pathname: '/schemaSetup',
      state: {
        loading: false,
        overrideFile: true,
      },
    });
  }
  render() {
    const iconElementRight = window.location.pathname === '/dataExplorer' ?
      <FlatButton label="Schema Setup" onTouchTap={this.navigateToSchemaSetup.bind(this)} /> : null;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
          </Drawer>
          <AppBar
            title="Data Explorer"
            onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
            iconElementRight={iconElementRight}
          />
          <div className="container-full" onClick={this.closeDrawerIfOpen.bind(this)}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
