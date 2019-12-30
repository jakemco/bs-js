import React, { Component } from 'react';
import './Roster.css';

class Roster extends Component {
    xpath(path) {
        const result = this.props.xml.evaluate(
            path, this.props.xml, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        // convert the XPath iterator into a legit iterator (generator)
        function *xpath_iter() {
            let nextNode = result.iterateNext();
            while (nextNode != null) {
                yield nextNode;
                nextNode = result.iterateNext();
            }
        }

        return xpath_iter();
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