import React, { Component } from 'react';
import './Summary.css';

class Summary extends Component {
    render() {
        const forces = this.props.roster.xpath('/roster/forces/force');

        return (
            <div className="Summary">
                {forces.map(f => <ForceSummary force={f} key={f.id} />)}
            </div>
        )
    }
}

class ForceSummary extends Component {

    selectionsByCategory() {
        const selections = this.props.force.xpath('./selections/selection');

        return selections.reduce((acc, s) => {
            const category = s.at_xpath("./categories/category[@primary='true']");
            const key = category != null ? category.getAttribute('name') : 'No Category';
            // defaault dict [], then push the selection back
            (acc[key] = acc[key] || []).push(s);
            return acc;
        }, {});
    }

    render() {
        return (
            <div className="ForceSummary">
                <h2>{this.props.force.getAttribute('name')}&nbsp;({this.props.force.getAttribute('catalogueName')})</h2>
                <ul className="ForceSummary-categories">
                    {Object.entries(this.selectionsByCategory()).map(([name, selections]) =>
                        <li key={name}>
                            {name}
                            <SelectionsSummary selections={selections} />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

function selectionHasUnit(s) {
    return s.xpath(".//profile[@typeName='Unit']").length
}

class SelectionsSummary extends Component {

    render() {
        const sorted = this.props.selections.sort((x, y) => {
            return selectionHasUnit(x) - selectionHasUnit(y);
        });

        return (
            <ul>{sorted.map(s =>
                <SelectionSummary selection={s} key={s.id} />
            )}</ul>
        );

    }
}


class SelectionSummary extends Component {

    render() {
        const selections = this.props.selection.xpath('./selections/selection');
        const number = parseInt(this.props.selection.getAttribute('number'), 10);
        const name = this.props.selection.getAttribute('name');

        const number_and_name = (number > 1 ? number + 'x ' : '') + name;

        return (
            <li className="SelectionSummary">
                {selectionHasUnit(this.props.selection)
                    ? <b>{number_and_name}</b>
                    : <em>{number_and_name}</em>
                }
                <SelectionsSummary selections={selections} />
            </li>
        )
    }
}

export default Summary;