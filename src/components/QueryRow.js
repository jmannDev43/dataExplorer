import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import AutoComplete from 'material-ui/AutoComplete';

class QueryRow extends Component {
  constructor() {
    super();
    this.state = {
      fields: [],
    };
  }
  changeCollection = () => {
    const selectedCollection = document.getElementById(`${this.props.rowInfo.rowNumber}_collection`).value;
    if (selectedCollection) {
      const collectionInfo = this.props.dbSchema[selectedCollection];
      const fields = collectionInfo.collectionFields;
      this.setState({ fields });
      this.props.updateRow(this.props.rowInfo.rowNumber);
    }
  };
  changeField = () => {
    this.props.updateRow(this.props.rowInfo.rowNumber);
  };
  changeValue = () => {
    this.props.updateRow(this.props.rowInfo.rowNumber);
  };
  render() {
    const style = { margin: '0 1em 0 1em' };
    const fabMethod = this.props.rowInfo.rowNumber === this.props.lastRowNumber ? this.props.addRow : this.props.removeRow;
    const fabIcon = this.props.rowInfo.rowNumber === this.props.lastRowNumber ? <ContentAdd/> : <ContentRemove/>;
    return (
      <div className="center queryRow" data-row-number={this.props.rowNumber}>
        <h3 className="inline">FIND </h3>
        <AutoComplete
          id={`${this.props.rowInfo.rowNumber}_collection`}
          style={style}
          searchText={this.props.rowInfo.collection}
          hintText="Enter collection name"
          dataSource={this.props.collectionNames}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          onClose={this.changeCollection.bind(this)}
        />
        <h3 className="inline"> WHERE </h3>
        <AutoComplete
          id={`${this.props.rowInfo.rowNumber}_field`}
          style={style}
          searchText={this.props.rowInfo.field}
          hintText="Enter field name"
          dataSource={this.state.fields}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          onClose={this.changeField.bind(this)}
        />
        <h3 className="inline"> = </h3>
        <TextField
          id={`${this.props.rowInfo.rowNumber}_value`}
          value={this.props.rowInfo.value}
          onChange={this.changeValue.bind(this)}
          style={style} floatingLabelText="Enter value(s)"
          hintText="separate multiple values with ','"
        />
        <FloatingActionButton
          id={`${this.props.rowInfo.rowNumber}_run`}
          onTouchTap={this.props.runQuery}
          mini={true} secondary={true}
          style={style}>
          {<PlayArrow />}
        </FloatingActionButton>
        <FloatingActionButton
          onTouchTap={fabMethod}
          id={`fab_${this.props.rowInfo.rowNumber}`}
          mini={true} secondary={true}
          style={style}>
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

export default QueryRow;
