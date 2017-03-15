import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';

import QueryArea from './QueryArea';
import ResultArea from './ResultArea';

class DataExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCollections: [],
    };
  }
  render() {
    const { collectionNames, dbSchema } = this.props.location.state;
    console.log('collectionNames', collectionNames);
    return (
      <div id="dataExplorer">
        <div className="row">
          <div className="col col-sm-10 col-sm-offset-1">
            <Card>
              <CardText>
                <QueryArea collectionNames={collectionNames.sort()} dbSchema={dbSchema} />
                <div className="row center">
                  <RaisedButton primary={true} label="Get Data" />
                </div>
              </CardText>
            </Card>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col col-sm-12">
            <Card>
              <CardText>
                <ResultArea />
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}


DataExplorer.defaultProps = {
  selectedCollections: [],
};

export default DataExplorer;
