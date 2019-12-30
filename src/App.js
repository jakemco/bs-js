import React, { Component } from 'react';
import './App.css';
import XMLUploader from './XMLUploader.js';
import Roster from './Roster.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { xml: null };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to BS JS</h2>
        </div>
        {this.state.xml == null
          ? <XMLUploader onUpload={(xml) => { this.setState({ xml: xml }); }} />
          : <Roster xml={this.state.xml} />
        }
      </div>
    );
  }

}

export default App;
