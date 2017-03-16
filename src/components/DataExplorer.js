import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import request from 'request';
import ConnectionModal from './ConnectionModal';

import QueryArea from './QueryArea';
import ResultArea from './ResultArea';

/*
  TODO: Get querying up and running
 */

class DataExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCollections: [],
      jsonResults: [],
      isModalOpen: false,
      connectionInfo: {
        mongoUrl: '',
        limit: 5,
      },
    };
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  submitModal = () => {
    const mongoUrl = document.getElementById('mongoUrl').value;
    const connectionInfo = {
      mongoUrl,
      limit: 5,
    };
    this.setState({ connectionInfo });
    this.closeModal();
  };
  getResults = () => {
    request('http://localhost:9000/getResults', (err, res, body) => {
      this.setState({ jsonResults: body });
    });
  };
  render() {
    const { collectionNames, dbSchema, connectionInfo } = this.props.location.state;
    const style = { marginRight: '1em' };
    return (
      <div id="dataExplorer">
        <div className="row">
          <div className="col col-sm-10 col-sm-offset-1">
            <Card>
              <CardText>
                <QueryArea collectionNames={collectionNames.sort()} dbSchema={dbSchema}/>
                <div className="row center">
                  <ConnectionModal open={this.state.isModalOpen} connectionInfo={connectionInfo} submit={this.submitModal.bind(this)} closeModal={this.closeModal.bind(this)} />
                  <RaisedButton style={style} onClick={this.openModal} primary={false} label="Configure DB Connection"/>
                  <RaisedButton primary={true} onClick={this.getResults.bind(this)} label="Get Data"/>
                </div>
              </CardText>
            </Card>
          </div>
        </div>
        <br />
        {this.state.jsonResults.length ?
          <div className="row">
            <div className="col col-sm-12">
              <ResultArea jsonResults={this.state.jsonResults} />
            </div>
          </div>
          : null}
      </div>
    );
  }
}

DataExplorer.defaultProps = {
  selectedCollections: [],
};

export default DataExplorer;
