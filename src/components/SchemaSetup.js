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
  getSchema() {
    this.setState({ loading: true });
    const hostname = document.getElementById('hostname').value;
    const port = document.getElementById('port').value;
    const database = document.getElementById('database').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let url;
    const baseUrl = 'http://localhost:9000/getSchema';
    if (username && password) {
      url = `${baseUrl}/${hostname}/${port}/${database}/${username}/${password}`;
    } else {
      url = `${baseUrl}/${hostname}/${port}/${database}`;
    }
    request(url, (err, res, body) => {
      const { dbSchema } = JSON.parse(body);
      const collectionNames = Object.keys(dbSchema);
      this.setState({ loading: false });
      browserHistory.push({
        pathname: '/dataExplorer',
        state: {
          collectionNames,
          dbSchema,
        },
      });
    });
  }
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
      </div>
    );
  }
}

export default SchemaSetup;
