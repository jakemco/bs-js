import React, { Component } from 'react';
import './Summary.css';

class Summary extends Component {
    render() {
        const forces = this.props.roster.xpath('/roster/forces/force');

        return (
            <div className="Summary">
                {forces.map(f => <ForceSummary roster={this.props.roster} force={f} key={f.id}/>)}
            </div>
        )
    }
}

class ForceSummary extends Component {

    selectionsByCategory() {
        const selections = this.props.roster.xpath('./selections/selection', this.props.force);

        return selections.reduce((acc, s) => {
            const category = this.props.roster.at_xpath("./categories/category[@primary='true']", s);
            const key = category != null ? category.getAttribute('name') : 'No Category';
            // defaault dict [], then push the selection back
            (acc[key] = acc[key] || []).push(s);
            return acc;
        }, {});
    }

    render() {
        return (
            <div className="ForceSummary">
                <h2>{this.props.force.getAttribute('name')} ({this.props.force.getAttribute('catalogueName')})</h2>
                <ul className="ForceSummary-categories">
                    {Object.entries(this.selectionsByCategory()).map(([name, selections]) => 
                        <li key={name}>{name}
                            <ul>
                                {selections.map((s) => 
                                    <li key={s.id}>{s.getAttribute('name')}</li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Summary;