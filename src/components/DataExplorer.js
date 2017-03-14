import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class CollectionNames extends Component {
  render() {
    return (
    <Drawer open={true}>
      {this.props.collectionNames.map(collection => {
        return <MenuItem key={collection} onTouchTap={this.props.selectCollection}>{collection}</MenuItem>;
      })}
    </Drawer>
    );
  }
}

// class CollectionNames extends Component {
//   render() {
//     const collectionStyle = { marginBottom: '0.5em' };
//     const containerStyle = { height: window.innerHeight - 115 };
//     return (
//       <div className="collectionNames" style={containerStyle}>
//         {this.props.collectionNames.map(collection => {
//           return <div key={collection}>
//             <RaisedButton style={collectionStyle} onClick={this.props.selectCollection} label={collection} primary={true}/>
//             <br />
//           </div>
//         })}
//       </div>
//     );
//   }
// }

class InputCell extends Component {
  render() {
    const inputId = `${this.props.collection}_${this.props.field}`;
    return (
      <TextField id={inputId} className="inputCell" floatingLabelText={this.props.field} />
    )
  }
}

class InputRows extends Component {
  render() {
    return (
      <div className="row">
        <span>{this.props.inputRow.collectionName}</span>
        <br />
        {this.props.inputRow.fields.map(field => {
          return <InputCell key={field} collection={this.props.inputRow.collectionName} field={field}/>
        })}
      </div>
    )
  }
}

class InputArea extends Component {
  render() {
    return (
      this.props.selectedCollections.length < 1 ? null :
        <div className="row">
          <div className="col col-sm-12 center">
            <Card>
              <Subheader>Add values to the fields below to filter data.</Subheader>
              <CardText>
                {this.props.selectedCollections.map((collection, i) => {
                  return <InputRows key={i.toString()} inputRow={collection}/>
                })}
              </CardText>
            </Card>
          </div>
        </div>
    )
  }
}

class DataExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCollections: [],
    };
  }
  toggleSelectedCollections(e) {
    const collectionName = e.target.innerText;
    const schema = this.props.location.state.dbSchema;
    const collectionInfo = schema[collectionName];
    if (collectionInfo) {
      const selectedCollections = this.state.selectedCollections.slice();
      const indexOfSelected = selectedCollections.findIndex(c => c.collectionName === collectionName);
      if (indexOfSelected > -1) {
        e.target.style.background = 'initial';
        selectedCollections.splice(indexOfSelected, 1);
      } else {
        e.target.style.backgroundColor = '#abe8ab';
        const fields = collectionInfo.collectionFields;
        selectedCollections.push({ collectionName, fields });
      }
      this.setState({ selectedCollections });
    }
    // add toastr to alert that collection has no fields...
  }
  render() {
    const { collectionNames, dbSchema } = this.props.location.state;
    console.log('collectionNames', collectionNames);
    return (
      <div id="dataExplorer">
        <div className="col col-sm-3">
          <CollectionNames collectionNames={collectionNames} selectCollection={this.toggleSelectedCollections.bind(this)}/>
        </div>
        <div className="col col-sm-9">
          <InputArea selectedCollections={this.state.selectedCollections} />
        </div>
      </div>
    );
  }
}

DataExplorer.defaultProps = {
  selectedCollections: [],
};

export default DataExplorer;
