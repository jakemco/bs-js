import React, { Component } from 'react';
import './Roster.css';

import Summary from './Summary.js';
import Stats from './Stats.js';

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
                <h1>Tables</h1>
                <Stats roster={this} type="Unit" />
                <Stats roster={this} type="Weapon" sort={(p1, p2) => {
                    const type1 = this.at_xpath(".//characteristic[@name='Type']", p1).textContent;
                    const type2 = this.at_xpath(".//characteristic[@name='Type']", p2).textContent;

                    if ((type1 === 'Melee' && type2 === 'Melee') || (type1 !== 'Melee' && type2 !== 'Melee')) {
                        const name1 = p1.getAttribute('name');
                        const name2 = p2.getAttribute('name');
                        if (name1 < name2) { return -1; }
                        if (name1 > name2) { return 1; }
                        return 0;
                    } else if (type1 === 'Melee') {
                        return 1;
                    } else if (type2 === 'Melee') {
                        return -1;
                    }

                    throw new Error('Should be unreachable, but what do I know?');
                }}/>
            </div>
        );
    }
}

export default Roster;