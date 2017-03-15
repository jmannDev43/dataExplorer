import React, { Component } from 'react';
import QueryRow from './QueryRow';

class QueryArea extends Component {
  constructor() {
    super();
    this.state = {
      queryRows: [{ rowNumber: 0, collection: '', field: '', value: '' }],
    };
  }
  addRow = (e) => {
    const nextRowNumber = this.state.queryRows[this.state.queryRows.length - 1].rowNumber + 1;
    const nextRow = { rowNumber: nextRowNumber, collection: '', field: '', value: '' };
    const queryRows = this.state.queryRows.slice();
    queryRows.push(nextRow);
    this.setState({ queryRows });
  };
  removeRow = (e) => {
    const removeIndex = parseInt(e.currentTarget.getAttribute('id').substr(0, 1));
    const queryRows = this.state.queryRows.slice();
    queryRows.splice(removeIndex, 1);
    this.setState({ queryRows });
  };
  updateRow = (rowNumber) => {
    const rowIndex = this.state.queryRows.findIndex(r => r.rowNumber === rowNumber);
    const collection = document.getElementById(`${rowNumber}_collection`).value;
    const field = document.getElementById(`${rowNumber}_field`).value;
    const value = document.getElementById(`${rowNumber}_value`).value;
    const updatedRow = { rowNumber, collection, field, value };
    const queryRows = this.state.queryRows.slice();
    queryRows[rowIndex] = updatedRow;
    this.setState({ queryRows });
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
          />;
        })}
      </div>
    );
  }
}

export default QueryArea;
