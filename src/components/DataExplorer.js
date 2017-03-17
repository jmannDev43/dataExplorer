import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import request from 'request';
import ConnectionModal from './ConnectionModal';

import QueryArea from './QueryArea';
import ResultArea from './ResultArea';

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
  componentDidMount() {
    const { connectionInfo } = this.props.location.state;
    this.setState({ connectionInfo });
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
  getResults = (e) => {
    console.log('e', e);
    const mongoUrl = encodeURIComponent(this.state.connectionInfo.mongoUrl);
    const limit = this.state.connectionInfo.limit;
    const rowNumber = e.currentTarget.getAttribute('id').replace('_run', '');
    console.log('rowNumber', rowNumber);
    const collection = document.getElementById(`${rowNumber}_collection`).value;
    const field = document.getElementById(`${rowNumber}_field`).value;
    const value = document.getElementById(`${rowNumber}_value`).value;
    const baseUrl = 'http://localhost:9000/getResults';
    const getResultsUrl = `${baseUrl}/${mongoUrl}/${limit}/${collection}/${field}/${value}`;
    if (!mongoUrl || !limit || !collection || !field || !value){
      // Send 'Missing Inputs' message
      return false;
    }
    request(getResultsUrl, (err, res, body) => {
      const jsonResults = JSON.parse(body);
      if (err){
        console.log('err', err);
        // Send 'Error' message
      }
      if (jsonResults.length){
        jsonResults[0].collection = collection;
        jsonResults[0].id = `${collection}_${rowNumber}`;
        this.setState({ jsonResults });
      } else {
        // Send 'No Results' message
      }
    });
  };
  clearResult = (resultId) => {
    const jsonResults = this.state.jsonResults.filter(result => result.id !== resultId);
    this.setState({ jsonResults });
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
                <QueryArea collectionNames={collectionNames.sort()} dbSchema={dbSchema} runQuery={this.getResults.bind(this)}/>
                <div className="row center">
                  <ConnectionModal open={this.state.isModalOpen} connectionInfo={connectionInfo} submit={this.submitModal.bind(this)} closeModal={this.closeModal.bind(this)} />
                  <RaisedButton style={style} onClick={this.openModal} primary={false} label="Configure DB Connection"/>
                </div>
              </CardText>
            </Card>
          </div>
        </div>
        <br />
        {this.state.jsonResults.length ?
          <div className="row">
            <div className="col col-sm-12">
              <ResultArea jsonResults={this.state.jsonResults} clearResult={this.clearResult.bind(this)} />
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
