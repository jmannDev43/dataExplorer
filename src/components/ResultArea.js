import React, { Component } from 'react';
import Result from './Result';

class ResultArea extends Component {
  constructor() {
    super();
    this.state = {
      numberCollectionsInResult: 0,
    };
  }

  render() {
    return (
      <div>
        {this.props.jsonResults.map((result, i) => {
          return <Result key={`result_${i.toString()}`} result={result} resultIndex={i} clearResult={this.props.clearResult} />;
        })}
      </div>
    );
  }
}

export default ResultArea;
