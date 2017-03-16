import React, { Component } from 'react';
import JSONFormatter from 'json-formatter-js';
import Close from 'material-ui/svg-icons/navigation/close';

class ResultArea extends Component {
  constructor() {
    super();
    this.state = {
      numberCollectionsInResult: 0,
    };
  }
  componentDidMount() {
    this.props.jsonResults.forEach((result, i) => {
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
    return (
      <div>
        {this.props.jsonResults.map((result, i) => {
          return <div key={result.id} id={result.id} className="col col-sm-3">
            <div className="closeIcon" onClick={this.props.clearResult.bind(null, result.id)}>
              <Close color="white" />
            </div>
            <div id={`jsonResults_${i.toString()}`} style={style}>

            </div>
          </div>;
        })}
      </div>
    );
  }
}

export default ResultArea;
