import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import request from 'request';
import { browserHistory } from 'react-router';

// Would be cool to give option to enter connection string instead.
class SchemaSetup extends Component {
  getSchema() {
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
      console.log('collectionNames', collectionNames);
      console.log('dbSchema', dbSchema);
      browserHistory.push({
        pathname: '/dataExplorer',
        state: {
          collectionNames,
          dbSchema,
        },
      });
    });
  }
  render() {
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
        </div>
      </div>
    );
  }
}

export default SchemaSetup;
