import React, { Component } from 'react';
import './Roster.css';

import Summary from './Summary.js';

class Roster extends Component {
    xpath(path, subsearch) {
        const result = this.props.xml.evaluate(
            path, subsearch || this.props.xml, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        const out = [];
        let nextNode = result.iterateNext();
        while (nextNode != null) {
            out.push(nextNode);
            nextNode = result.iterateNext();
        }

        return out;
    }

    at_xpath(path, subsearch) {
        const result = this.props.xml.evaluate(
            path, subsearch || this.props.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }

    render() {
        return (
            <div className="Roster">
                <h1>{this.at_xpath('/roster').getAttribute('name')}</h1>
                <Summary roster={this} />
                {/* TODO: cheatsheet goes here */}
            </div>
        );
    }
}

export default Roster;