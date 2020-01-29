import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import TermsOfReference from './terms/TermsOfReference';
import VDRTabs from './tabs/VDRTabs';
import { setCookie, getCookie } from './utilities/cookies'
import $ from 'jquery'

/**
 * Shows terms of reference if not already agreed to
 * Shows main app if terms of reference agreed to
 */

class AppContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cookieName: "TORAgreement",
            title: 'VICO Terms of Reference',
            body: 'Do not steal this stuff',
            modified: '',
            cookieDays: 1,
            agree: false
        }
    }

    handleAgree = () => {
        setCookie(this.state.cookieName + this.state.modified, "true", this.state.cookieDays);
        this.updateAgree();
    }

    handleDisagree = () => {
        window.close()
        window.location = '/_layouts/signout.aspx'
    }

    updateState = (newState) => {
        this.setState(newState, function () {
            this.updateAgree();
        })
    }

    updateAgree = () => {
        const cookie = (getCookie(this.state.cookieName + this.state.modified)) ? true : false

        this.setState({
            agree: cookie
        }, function () {
            this.forceUpdate();
        })
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
            _this.updateState({
                title: data.d.results[0].TextValue,
                body: data.d.results[0].MultiTextValue,
                modified: data.d.results[0].Modified,
                cookieDays: data.d.results[0].NumberValue
            })
        }).fail(function (err) {
            window.console && console.warn("Error is Expected if page loaded outside sharepoint", err);
            _this.updateAgree()
        })
    }

    render() {
        if (this.state.agree) {
            return <VDRTabs />
        } else {
            return <TermsOfReference
                title={this.state.title}
                body={this.state.body}
                handleAgree={this.handleAgree}
                handleDisagree={this.handleDisagree}
            />
        }
    }
}

export default AppContent