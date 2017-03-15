import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';


class QueryRow extends Component {
  constructor() {
    super();
    this.state = {
      fields: [],
    };
  }
  changeCollection = () => {
    const selectedCollection = document.getElementById(`row${this.props.rowNumber}_collection`).value;
    if (selectedCollection) {
      const collectionInfo = this.props.dbSchema[selectedCollection];
      const fields = collectionInfo.collectionFields;
      this.setState({ fields });
    }
  };
  render() {
    const style = { margin: '0 1em 0 1em' };
    const fabMethod = this.props.rowNumber === this.props.lastRowNumber ? this.props.addRow : this.props.removeRow;
    const fabIcon = this.props.rowNumber === this.props.lastRowNumber ? <ContentAdd/> : <ContentRemove/>;
    return (
      <div className="center queryRow" data-row-number={this.props.rowNumber}>
        <h3 className="inline">FIND </h3>
        <AutoComplete
          id={`row${this.props.rowNumber}_collection`}
          style={style}
          hintText="Enter collection name"
          dataSource={this.props.collectionNames}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          onClose={this.changeCollection.bind(this)}
        />
        <h3 className="inline"> WHERE </h3>
        <AutoComplete
          id={`row${this.props.rowNumber}_field`}
          style={style}
          hintText="Enter field name"
          dataSource={this.state.fields}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
        />
        <h3 className="inline"> = </h3>
        <TextField id={`row${this.props.rowNumber}_value`} style={style} floatingLabelText="Enter value(s)" hintText="separate multiple values with ','" />
        <FloatingActionButton onTouchTap={fabMethod} id={`fab_${this.props.rowNumber}`} mini={true} secondary={true} style={style}>
            {fabIcon}
        </FloatingActionButton>
      </div>
    );
  }
}

QueryRow.defaultProps = {
  collectionSearchText: '',
  fields: [],
};

class QueryArea extends Component {
  constructor() {
    super();
    this.state = {
      queryRows: [0],
    };
  }
  addRow = (e) => {
    const nextRow = this.state.queryRows[this.state.queryRows.length - 1] + 1;
    const queryRows = this.state.queryRows.slice();
    queryRows.push(nextRow);
    this.setState({ queryRows });
  };
  removeRow = (e) => {
    const removeIndex = parseInt(e.currentTarget.getAttribute('id').replace('fab_', ''));
    const queryRows = this.state.queryRows.slice();
    queryRows.splice(removeIndex, 1);
    this.setState({ queryRows });
  };
  render() {
    return (
      <div>
        {this.state.queryRows.map(row => {
          return <QueryRow key={row.toString()}
                   addRow={this.addRow.bind(this)}
                   removeRow={this.removeRow.bind(this)}
                   rowNumber={row}
                   lastRowNumber={(this.state.queryRows.length - 1)}
                   collectionNames={this.props.collectionNames}
                   dbSchema={this.props.dbSchema}
                />
        })}
      </div>
    );
  }
}

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
          <div className="col col-sm-6 col-sm-offset-3">
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

class ResultArea extends Component {
  render() {
    return (
      <div>
        <h1>Result Area</h1>
      </div>
    );
  }
}

DataExplorer.defaultProps = {
  selectedCollections: [],
};

export default DataExplorer;
