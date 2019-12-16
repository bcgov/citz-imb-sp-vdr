import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import ToRDialog from './TermsOfReference';
import VDRTabs from './VDRTabs';

class AppContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showToR: true
        }
    }

    agreementCallback = (childShowToR) => {
        this.setState({ showToR: childShowToR })
    }

    render() {
        console.log("this.state.showToR", this.state.showToR)
        if (this.state.showToR) {
            return <ToRDialog agreementCallback={this.agreementCallback} />
        } else {
            return <VDRTabs />
        }
    }
}

export default AppContent