import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

class QueryRow extends Component {
  constructor() {
    super();
    this.state = {
      fields: [],
    };
  }
  changeCollection() {
    const selectedCollection = document.getElementById(`${this.props.rowInfo.rowNumber}_collection`).value;
    if (selectedCollection) {
      const collectionInfo = this.props.dbSchema[selectedCollection];
      if (collectionInfo) {
        const fields = collectionInfo.collectionFields;
        this.setState({ fields });
        this.props.updateRow(this.props.rowInfo.rowNumber, 'collection');
      }
      document.getElementById(`${this.props.rowInfo.rowNumber}_field`).focus();
    }
  }
  changeField() {
    this.props.updateRow(this.props.rowInfo.rowNumber, 'field');
    document.getElementById(`${this.props.rowInfo.rowNumber}_value`).focus();
  }
  changeValue() {
    this.props.updateRow(this.props.rowInfo.rowNumber, 'value');
  }
  changeValueType(e) {
    const valueType = e.target.innerHTML.toLowerCase();
    this.props.updateRow(this.props.rowInfo.rowNumber, 'valueType', valueType);
  }
  onValueKeyDown(e) {
    if (e.keyCode === 13) {
      const rowNumber = e.currentTarget.getAttribute('id').replace('_value', '');
      document.getElementById(`${rowNumber}_run`).click();
    }
  }
  render() {
    const style = {
      margin: {
        margin: '0 1em 0 1em',
      },
      textField: {
        margin: '0 0 0 1em',
        maxWidth: '150px',
      },
      dropDown: {
        margin: '0 0 0 0',
      },
    };
    const fabMethod = this.props.rowInfo.rowNumber === this.props.lastRowNumber ? this.props.addRow : this.props.removeRow;
    const fabIcon = this.props.rowInfo.rowNumber === this.props.lastRowNumber ? <ContentAdd/> : <ContentRemove/>;
    return (
      <div className="center queryRow" data-row-number={this.props.rowNumber}>
        <h3 className="inline">FIND </h3>
        <AutoComplete
          id={`${this.props.rowInfo.rowNumber}_collection`}
          style={style.margin}
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
          style={style.margin}
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
          style={style.textField} floatingLabelText="Enter value(s)"
          onKeyDown={this.onValueKeyDown.bind(this)}
        />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          id={`${this.props.rowInfo.rowNumber}_valueType`}
          value={this.props.rowInfo.valueType}
          onChange={this.changeValueType.bind(this)}
          autoWidth={true}>
          <MenuItem value={'string'} primaryText="String" />
          <MenuItem value={'int'} primaryText="Int" />
          <MenuItem value={'float'} primaryText="Float" />
        </IconMenu>
        <FloatingActionButton
          id={`${this.props.rowInfo.rowNumber}_run`}
          onTouchTap={this.props.runQuery}
          onClick={this.props.runQuery}
          mini={true} secondary={true}
          style={style.margin}>
          {<PlayArrow />}
        </FloatingActionButton>
        <FloatingActionButton
          onTouchTap={fabMethod}
          id={`fab_${this.props.rowInfo.rowNumber}`}
          mini={true} secondary={true}
          style={style.margin}>
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
