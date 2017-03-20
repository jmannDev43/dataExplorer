import React, { Component } from 'react';
import Result from './Result';
import { Resizable, ResizableBox } from 'react-resizable';

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
          return <ResizableBox key={`result_${i.toString()}`} width={345} height={300} >
            <Result result={result} resultIndex={i} clearResult={this.props.clearResult} />
          </ResizableBox>;
        })}
      </div>
    );
  }
}

export default ResultArea;
