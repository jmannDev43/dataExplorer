import React, { Component } from 'react';
import JSONFormatter from 'json-formatter-js';
import Close from 'material-ui/svg-icons/navigation/close';

class Result extends Component {
  componentDidUpdate() {
    const formatter = new JSONFormatter(this.props.result, 1, { theme: 'dark' });
    document.getElementById(`jsonResults_${this.props.resultIndex.toString()}`).innerHTML = '';
    const p = document.createElement('p');
    p.innerText = this.props.result.collection;
    p.className = 'resultHeader';
    document.getElementById(`jsonResults_${this.props.resultIndex.toString()}`).appendChild(p);
    document.getElementById(`jsonResults_${this.props.resultIndex.toString()}`).appendChild(formatter.render());
  }
  clearResult(e) {
    this.props.clearResult(this.props.resultIndex);
  }
  render() {
    const style = {
      padding: '1em',
      borderRadius: '7px',
      backgroundColor: '#383838',
    };
    return (
      <div key={this.props.result.id} id={this.props.result.id}>
        <div className="closeIcon" onClick={this.clearResult.bind(this)}>
          <Close color="white" />
        </div>
        <div id={`jsonResults_${this.props.resultIndex.toString()}`} style={style}>

        </div>
      </div>
    );
  }
}

export default Result;
