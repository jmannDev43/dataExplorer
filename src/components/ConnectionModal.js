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
        <div className="col col-sm-8">
          <TextField id="mongoUrl" defaultValue={this.props.connectionInfo.mongoUrl} floatingLabelText={'Enter Connection URI'} fullWidth={true} />
        </div>
        <div className="col col-sm-4">
          <TextField id="limitPerCollection" defaultValue={this.props.connectionInfo.limit} floatingLabelText={'Enter collection limit'} fullWidth={true} />
        </div>
      </Dialog>
    );
  }
}

ConnectionModal.defaultProps = {
  connectionInfo: {
    mongoUrl: '',
    limit: 5,
  },
};

export default ConnectionModal;
