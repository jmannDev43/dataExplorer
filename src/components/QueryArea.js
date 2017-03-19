import React, { Component } from 'react';
import QueryRow from './QueryRow';

class QueryArea extends Component {
  constructor() {
    super();
    this.state = {
      queryRows: [{ rowNumber: 0, collection: '', field: '', value: '', valueType: 'string' }],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const newRowNumber = prevState.queryRows.length;
    const newRow = document.getElementById(`${newRowNumber}_collection`);
    if (newRow) {
      newRow.focus();
    }
  }
  addRow(e) {
    const nextRowNumber = this.state.queryRows[this.state.queryRows.length - 1].rowNumber + 1;
    const nextRow = { rowNumber: nextRowNumber, collection: '', field: '', value: '', valueType: 'string' };
    const queryRows = this.state.queryRows.slice();
    queryRows.push(nextRow);
    this.setState({ queryRows });
  }
  removeRow(e) {
    const removeIndex = parseInt(e.currentTarget.getAttribute('id').substr(0, 1), 10);
    const queryRows = this.state.queryRows.slice();
    queryRows.splice(removeIndex, 1);
    this.setState({ queryRows });
  }
  updateRow(rowNumber, propertyName, newValue) {
    const rowIndex = this.state.queryRows.findIndex(r => r.rowNumber === rowNumber);
    const updatedValue = newValue || document.getElementById(`${rowNumber}_${propertyName}`).value;
    const queryRows = this.state.queryRows.slice();
    queryRows[rowIndex][propertyName] = updatedValue;
    this.setState({ queryRows });
  }
  runQuery(e) {
    const rowNumber = e.currentTarget.getAttribute('id').replace('_run', '');
    const queryRow = this.state.queryRows[rowNumber];
    this.props.runQuery(queryRow);
  }
  render() {
    return (
      <div>
        {this.state.queryRows.map(rowInfo => {
          return <QueryRow
            key={rowInfo.rowNumber.toString()}
            addRow={this.addRow.bind(this)}
            removeRow={this.removeRow.bind(this)}
            updateRow={this.updateRow.bind(this)}
            rowInfo={rowInfo}
            lastRowNumber={this.state.queryRows[(this.state.queryRows.length - 1)].rowNumber}
            collectionNames={this.props.collectionNames}
            dbSchema={this.props.dbSchema}
            runQuery={this.runQuery.bind(this)}
          />;
        })}
      </div>
    );
  }
}

export default QueryArea;
