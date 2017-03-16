import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import request from 'request';
import { browserHistory } from 'react-router';

import Loading from './Loading';

class SchemaSetup extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  getConnectionUrlFromForm(baseUrl, isMongo) {
    const hostname = document.getElementById('hostname').value;
    const port = document.getElementById('port').value;
    const database = document.getElementById('database').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const portSeparator = isMongo ? ':' : '/';
    baseUrl = isMongo ? 'mongodb://' : baseUrl;

    let connectionString;

    if (username && password) {
      connectionString = `${baseUrl}${hostname}${portSeparator}${port}/${database}/${username}/${password}`;
    } else {
      connectionString = `${baseUrl}${hostname}${portSeparator}${port}/${database}`;
    }
    return connectionString;
  }
  getSchema() {
    this.setState({ loading: true });
    const getSchemaUrl = this.getConnectionUrlFromForm('http://localhost:9000/getSchema/', false);
    const mongoUrl = this.getConnectionUrlFromForm('', true);
    request(getSchemaUrl, (err, res, body) => {
      const { dbSchema } = JSON.parse(body);
      const collectionNames = Object.keys(dbSchema);
      this.setState({ loading: false });
      browserHistory.push({
        pathname: '/dataExplorer',
        state: {
          collectionNames,
          dbSchema,
          connectionInfo: {
            mongoUrl,
            limit: 5,
          },
        },
      });
    });
  };
  skipSetupWhenSchemaFileExists() {
    if (this.props.location.state && this.props.location.state.overrideFile) {
      return true;
    }
    request('http://localhost:9000/schemaFileExists', (err, res, body) => {
      if (res) {
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
              <TextField id="port" floatingLabelText={'Port'} defaultValue={'27017'}/>
              <TextField id="database" floatingLabelText={'Database name'} defaultValue={'Northwind'}/>
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
      </div>
    );
  }
}

export default SchemaSetup;
