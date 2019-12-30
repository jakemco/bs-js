import React, { Component } from 'react';
import './Roster.css';

import Summary from './Summary.js';
import Stats from './Stats.js';
import BSNode from './BSNode';

class Roster extends Component {
    render() {
        const roster = new BSNode(this.props.xml);
        return (
            <div className="Roster">
                <h1>{roster.at_xpath('/roster').getAttribute('name')}</h1>
                <Summary roster={roster} />
                <h1>Tables</h1>
                <Stats roster={roster} type="Unit" />
                <Stats roster={roster} type="Weapon" sort={(p1, p2) => {
                    const type1 = p1.at_xpath(".//characteristic[@name='Type']").textContent;
                    const type2 = p2.at_xpath(".//characteristic[@name='Type']").textContent;

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