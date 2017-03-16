import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';

import QueryArea from './QueryArea';
import ResultArea from './ResultArea';

/*
  TODO: Get mongorito up and running
  TODO: Add ability to connect via mongo URI
 */

class DataExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCollections: [],
      jsonResults: [],
    };
  }
  render() {
    const { collectionNames, dbSchema } = this.props.location.state;
    return (
      <div id="dataExplorer">
        <div className="row">
          <div className="col col-sm-10 col-sm-offset-1">
            <Card>
              <CardText>
                <QueryArea collectionNames={collectionNames.sort()} dbSchema={dbSchema}/>
                <div className="row center">
                  <RaisedButton primary={true} label="Get Data"/>
                </div>
              </CardText>
            </Card>
          </div>
        </div>
        <br />
        {this.state.jsonResults.length ?
          <div className="row">
            <div className="col col-sm-12">
              <Card>
                <CardText>
                  <ResultArea />
                </CardText>
              </Card>
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
