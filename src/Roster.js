import React, { Component } from 'react';
import './Roster.css';

class Roster extends Component {
    render() {
        return (
            <div className="Roster">
                <h1>{this.props.xml.getElementsByTagName('roster')[0].getAttribute('name')}</h1>
            </div>
        );
    }
}

export default Roster;