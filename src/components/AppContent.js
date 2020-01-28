import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import TermsOfReference from './terms/TermsOfReference';
import VDRTabs from './tabs/VDRTabs';
import { getCookie } from './utilities/cookies'

class AppContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cookieName: "TORAgreement",
            showAgreement: true
        }
    }

    componentDidMount = () => {

    }

    successCallback = args => {
        console.log(args)
    }


    render() {
        if (false) {
            return <VDRTabs />
        } else {
            return <TermsOfReference
                successCallback={this.successCallback}
                cookieName={this.state.cookieName}
            />
        }
    }
}

export default AppContent