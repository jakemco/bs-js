
import React, { Component } from 'react';
import oval from './oval.svg';

class XMLUploader extends Component {

    constructor(props) {
        super(props);

        this.state = { error: null, loading: false };
    }

    handleNewFile(file) {
        this.setState({ error: null, loading: true });

        const reader = new FileReader();

        reader.addEventListener('error', (e) => {
            this.setState({ error: e.message, loading: false });
        });

        reader.addEventListener('load', (e) => {
            this.setState({ error: null, loading: false });
            const xml = this.parseXML(reader.result);

            if (xml != null) {
                this.props.onUpload(xml);
            }
        });

        reader.readAsText(file);
    }

    parseXML(contents) {
        const dom = (new DOMParser()).parseFromString(contents, 'application/xml');
        const errors = dom.getElementsByTagName('parsererror');
        if (errors.length !== 0) {
            this.setState({ error: 'failed to parse xml: ' + errors[0].innerText });
            return null;
        }
        return dom;
    }

    render() {
        return (
            <div className="App-intro">
                <p>
                    To get started, upload a roster file:<br /><em>(note: this should be a .ros (XML), not a .rosz (zipped XML))</em>
                </p>
                <input type="file" id="rosterUpload" onChange={(e) => { this.handleNewFile(e.target.files[0]); e.target.value = null; }} />
                <div>
                    {this.state.loading ? <img src={oval} alt="loading" /> : null}
                    {this.state.error != null ? <p className="upload-error">{this.state.error}</p> : null}
                </div>
            </div>
        );
    }
}

export default XMLUploader;
