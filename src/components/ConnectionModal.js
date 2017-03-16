import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class ConnectionModal extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={false}
        onTouchTap={this.props.closeModal}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.submit}
      />,
    ];
    return (
      <Dialog
        title="Connect to Different Mongo Database for Querying"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closeModal}
      >
        <TextField id="connectionURI" floatingLabelText={'Enter Connection URI'} fullWidth={true} />
      </Dialog>
    );
  }
}
export default ConnectionModal;
