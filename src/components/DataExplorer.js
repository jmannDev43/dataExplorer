import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';

import request from 'request';
import ConnectionModal from './ConnectionModal';
import SnackMessage from './SnackMessage';

import QueryArea from './QueryArea';
import ResultArea from './ResultArea';
import Loading from './Loading';
import utils from '../utils';

class DataExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedCollections: [],
      jsonResults: [],
      isModalOpen: false,
      connectionInfo: {
        mongoUrl: '',
        limit: 5,
      },
      snackMessage: {
        showMessage: false,
        message: '',
      },
    };
  }
  componentDidMount() {
    const { connectionInfoFromRoute } = this.props.location.state;
    this.setState({ connectionInfo: connectionInfoFromRoute });
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  submitModal() {
    const mongoUrl = document.getElementById('mongoUrl').value;
    const connectionInfo = {
      mongoUrl,
      limit: 5,
    };
    this.setState({ connectionInfo });
    this.closeModal();
  }
  getResults(queryRow) {
    this.setState({ loading: true });
    let snackMessage = this.state.snackMessage;
    if (!this.state.connectionInfo) {
      snackMessage = utils.getSnackMessage(true, 'Missing Mongo connection info. Please configure database connection.');
      this.setState({ snackMessage });
      this.setState({ loading: false});
      return false;
    }
    const mongoUrl = encodeURIComponent(this.state.connectionInfo.mongoUrl);
    const limit = this.state.connectionInfo.limit;
    const { rowNumber, collection, field, value, valueType } = queryRow;
    const baseUrl = 'http://localhost:9000/getResults';
    const getResultsUrl = `${baseUrl}/${mongoUrl}/${limit}/${collection}/${field}/${value}/${valueType}`;

    if (!mongoUrl || !limit || !collection || !field || !value || !valueType) {
      snackMessage = utils.getSnackMessage(true, 'Missing or invalid form values.  Please try again.');
      this.setState({ snackMessage });
      this.setState({ loading: false});
      return false;
    }
    this.requestData(getResultsUrl, collection, rowNumber, snackMessage);
    return undefined;
  }
  requestData(getResultsUrl, collection, rowNumber) {
    let snackMessage = this.state.snackMessage;
    request(getResultsUrl, (err, res, body) => {
      if (err) {
        console.log('err', err);
        snackMessage = utils.getSnackMessage(true, `Error: ${err}`);
        this.setState({ snackMessage });
        this.setState({ loading: false});
        return false;
      }
      const newJsonResults = JSON.parse(body);
      if (newJsonResults.length) {
        const jsonResults = this.state.jsonResults.slice();
        if (jsonResults.find(j => j.id === newJsonResults.id)) {
          jsonResults[rowNumber] = newJsonResults;
        } else {
          jsonResults.push(newJsonResults);
        }
        this.setState({ jsonResults });
      } else {
        snackMessage = utils.getSnackMessage(true, 'No results found!');
      }
      this.setState({ snackMessage });
      this.setState({ loading: false });
      return undefined;
    });
  }
  clearSnackMessage() {
    const snackMessage = utils.getSnackMessage(false, '');
    this.setState({ snackMessage });
  }
  clearResult(resultId) {
    const jsonResults = this.state.jsonResults.filter(result => result.id !== resultId);
    this.setState({ jsonResults });
  }
  render() {
    const { collectionNames, dbSchema, connectionInfoFromRoute } = this.props.location.state;
    const connectionInfo = (this.state.connectionInfo && this.state.connectionInfo.mongoUrl) ? this.state.connectionInfo : connectionInfoFromRoute;
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
                  <RaisedButton style={style} onClick={this.openModal.bind(this)} primary={false} label="Configure DB Connection"/>
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
        <SnackMessage
          open={this.state.snackMessage.showMessage}
          message={this.state.snackMessage.message}
          clearMessage={this.clearSnackMessage.bind(this)}
        />
        <br />
        {this.state.loading ? <Loading/> : null}
      </div>
    );
  }
}

DataExplorer.defaultProps = {
  selectedCollections: [],
};

export default DataExplorer;
