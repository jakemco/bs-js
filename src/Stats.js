import React, { Component } from 'react';
import './Stats.css';

class Stats extends Component {
    render() {
        const profiles = this.props.roster.xpath("//profile[@typeName='" + this.props.type + "']");
        if (this.props.sort != null) {
            profiles.sort(this.props.sort);
        }
        const statlines = profiles.reduce((acc, p) => {
            const name = p.getAttribute('name');
            const statline = p.xpath(".//characteristic").reduce((sts, ch) => {
                sts[ch.getAttribute('name')] = ch.textContent;
                return sts;
            }, {});

            acc[name] = statline;
            return acc;
        }, {});

        return (
            <div className="Stats">
                <table>
                    <thead>
                        <tr>
                            <th>Model</th>
                            {Object.keys(Object.values(statlines)[0]).map(k => <th key={k}>{k}</th>)}
                        </tr>
                    </thead>
                    <tbody >
                        {Object.entries(statlines).map(([name, st]) =>
                            <tr key={name}>
                                <td>{name}</td>
                                {Object.entries(st).map( ([k,v])=> <td key={k}>{v}</td>)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stats;