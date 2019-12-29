import React, { Component } from 'react';
import './App.css';
import XMLUploader from './XMLUploader.js';

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
        { this.state.roster == null
          ? <XMLUploader onUpload={(xml) => { this.setState({roster: xml}); }} />
          : <h1>{this.state.roster.getElementsByTagName('roster')[0].getAttribute('name')}</h1>
        }
      </div>
    );
  }

}

export default App;
