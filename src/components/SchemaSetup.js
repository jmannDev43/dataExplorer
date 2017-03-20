import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import request from 'request';
import { browserHistory } from 'react-router';

import Loading from './Loading';
import SnackMessage from './SnackMessage';
import utils from '../utils';

class SchemaSetup extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      snackMessage: {
        showMessage: false,
        message: '',
      },
    };
  }
  getConnectionUrlFromForm(inputUrl, isMongo) {
    const hostname = document.getElementById('hostname').value;
    const port = document.getElementById('port').value;
    const database = document.getElementById('database').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const portSeparator = isMongo ? ':' : '/';
    const baseUrl = isMongo ? 'mongodb://' : inputUrl;

    if (!hostname || !port || !database) {
      return false;
    }

    let connectionString;
    if (username && password) {
      connectionString = `${baseUrl}${hostname}${portSeparator}${port}/${database}/${username}/${password}`;
    } else {
      connectionString = `${baseUrl}${hostname}${portSeparator}${port}/${database}`;
    }
    return connectionString;
  }
  clearSnackMessage() {
    const snackMessage = utils.getSnackMessage(false, '');
    this.setState({ snackMessage });
  }
  getSchema() {
    this.setState({ loading: true });
    let snackMessage = this.state.snackMessage;
    const getSchemaUrl = this.getConnectionUrlFromForm('http://localhost:9000/getSchema/', false);
    if (!getSchemaUrl) {
      snackMessage = utils.getSnackMessage(true, 'Missing databaes connection details.  Please update and try again.');
      this.setState({ snackMessage });
      return false;
    }
    this.requestSchema(getSchemaUrl);
    return undefined;
  }
  requestSchema(getSchemaUrl) {
    let snackMessage = this.state.snackMessage;
    const mongoUrl = this.getConnectionUrlFromForm('', true);
    request(getSchemaUrl, (err, res, body) => {
      if (!res || res.statusCode !== 200) {
        snackMessage = utils.getSnackMessage(true, res.body);
        this.setState({ loading: false });
        this.setState({ snackMessage });
        return false;
      }
      const { dbSchema } = JSON.parse(body);
      const collectionNames = Object.keys(dbSchema);
      this.setState({ loading: false });
      this.setState({ snackMessage });
      browserHistory.push({
        pathname: '/dataExplorer',
        state: {
          collectionNames,
          dbSchema,
          connectionInfoFromRoute: {
            mongoUrl,
            limit: 5,
          },
        },
      });
      return undefined;
    });
  }
  skipSetupWhenSchemaFileExists() {
    if (this.props.location.state && this.props.location.state.overrideFile) {
      return true;
    }
    request('http://localhost:9000/schemaFileExists', (err, res, body) => {
      if (body && body !== 'false') {
        const dbSchema = JSON.parse(res.body);
        const collectionNames = Object.keys(dbSchema);
        browserHistory.push({
          pathname: '/dataExplorer',
          state: {
            collectionNames,
            dbSchema,
          },
        });
      }
    });
    return undefined;
  }
  render() {
    this.skipSetupWhenSchemaFileExists();
    return (
      <div className="row">
        <div className="col col-sm-8 col-sm-offset-2 center">
          <Card>
            <CardTitle title="Enter database connection information below"/>
            <CardText>
              <TextField id="hostname" floatingLabelText={'Hostname'} defaultValue={'localhost'}/>
              <TextField id="port" floatingLabelText={'Port'} defaultValue={'3001'}/>
              <TextField id="database" floatingLabelText={'Database name'} defaultValue={'meteor'}/>
              <br />
              <TextField id="username" floatingLabelText={'Username (optional)'}/>
              <TextField id="password" floatingLabelText={'Password (optional)'} type="password"/>
              <br />
              <RaisedButton label="Retrieve Schema Info" primary={true} onClick={this.getSchema.bind(this)}/>
            </CardText>
          </Card>
          <br />
          {this.state.loading ? <Loading/> : null}
        </div>
        <SnackMessage
          open={this.state.snackMessage.showMessage}
          message={this.state.snackMessage.message}
          clearMessage={this.clearSnackMessage.bind(this)}
        />
      </div>
    );
  }
}

export default SchemaSetup;
