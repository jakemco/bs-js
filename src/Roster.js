import React, { Component } from 'react';
import './Roster.css';

class Roster extends Component {

    ns_resolver() {
        return this.props.xml.createNSResolver(this.props.xml.firstElementChild);
    }

    xpath(path) {
        const result = this.props.xml.evaluate(
            path, this.props.xml, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        const out = [];

        let nextNode = result.iterateNext();
        while (nextNode != null) {
            out.push(nextNode);
            nextNode = result.iterateNext();
        }

        return out;
    }

    at_xpath(path) {
        const result = this.props.xml.evaluate(
            path, this.props.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }

    render() {
        return (
            <div className="Roster">
                <h1>{this.at_xpath('/roster').getAttribute('name')}</h1>
            </div>
        );
    }
}

export default Roster;