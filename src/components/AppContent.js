import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import TermsOfReference from './terms/TermsOfReference';
import VDRTabs from './tabs/VDRTabs';
import { getCookie, setCookie } from './utilities/cookies'
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
            url: "../_api/Web/Lists/getbytitle('Config')/items?$filter=Key eq 'TOR'&$select=TextValue,MultiTextValue,Modified,NumberValue",
            type: "GET",
            async: false,
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        }).done(function (data) {
            _this.setState({
                title: data.d.results[0].TextValue,
                body: data.d.results[0].MultiTextValue,
                cookie: "TORAgreement" + data.d.results[0].modified,
                cookieDays: data.d.results[0].NumberValue
            })
        }).fail(function (err) {
            window.console && console.log(err);
        });
    }

    agreementCallback = () => {
        this.setState({
            cookie: "TORAgreement" + this.state.modified
        })
        setCookie(this.state.cookie, "true", this.state.cookieDays);
    }

    render() {
        if (getCookie(this.state.cookie)) {
            return <VDRTabs />
        } else {
            return <TermsOfReference {...this.state} agreementCallback={this.agreementCallback} />
        }
    }
}

export default AppContent