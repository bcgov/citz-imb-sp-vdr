import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import TermsOfReference from './terms/TermsOfReference';
import VDRTabs from './tabs/VDRTabs';
import {getCookie, setCookie} from './utilities/cookies'
import $ from 'jquery'

class AppContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showToR: true,
            title: 'VICO Terms of Reference',
            body: 'Do not steal this stuff'
        }
    }

    componentDidMount = () => {
        const _this = this

        $.ajax({
            url: "../_api/Web/Lists/getbytitle('Config')/items?$filter=Key eq 'TOR'&$select=TextValue,MultiTextValue,Modified",
            type: "GET",
            async: false,
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        }).done(function (data) {
            _this.setState({
                title: data.d.results[0].TextValue,
                body: data.d.results[0].MultiTextValue,
                modified: data.d.results[0].modified
            })

        }).fail(function (err) {
            window.console && console.log(err);

        });
    }

    agreementCallback = (childShowToR) => {
        this.setState({ showToR: childShowToR })
    }

    render() {
        console.log("this.state.showToR", this.state.showToR)
        if (this.state.showToR) {
            return <TermsOfReference {...this.state} agreementCallback={this.agreementCallback} />
        } else {
            return <VDRTabs />
        }
    }
}

export default AppContent