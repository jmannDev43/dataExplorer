import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class SnackMessage extends Component {
  callParentClearSnack() {
    this.props.clearMessage();
  }
  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={this.callParentClearSnack.bind(this)}
      />
    );
  }
}


export default SnackMessage;
