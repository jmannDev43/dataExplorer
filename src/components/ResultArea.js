import React, { Component } from 'react';
import JSONFormatter from 'json-formatter-js';

class ResultArea extends Component {
  constructor() {
    super();
    this.state = {
      numberCollectionsInResult: 0,
    };
  }
  componentDidMount() {
    const jsonResults = JSON.parse(this.props.jsonResults);
    jsonResults.forEach((result, i) => {
      const formatter = new JSONFormatter(result, 3, { theme: 'dark' });
      document.getElementById(`jsonResults_${i.toString()}`).appendChild(formatter.render());
    });
  }
  render() {
    const style = {
      padding: '1em',
      borderRadius: '7px',
      backgroundColor: '#383838',
    };
    const jsonResults = JSON.parse(this.props.jsonResults);
    return (
      <div>
        {jsonResults.map((result, i) => {
          return <div key={`${result.collection}_results_${i.toString()}`} className="col col-sm-3">
            <div id={`jsonResults_${i.toString()}`} style={style}>

            </div>
          </div>;
        })}
      </div>
    );
  }
}

export default ResultArea;
