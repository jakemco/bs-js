import React, { Component } from 'react';
import './App.css';
import XMLUploader from './XMLUploader.js';
import Roster from './Roster.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { roster: null };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to BS JS</h2>
        </div>
        {this.state.roster == null
          ? <XMLUploader onUpload={(xml) => { this.setState({ roster: xml }); }} />
          : <Roster xml={this.state.roster} />
        }
      </div>
    );
  }

}

export default App;
