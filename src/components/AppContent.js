import 'react-tabs/style/react-tabs.css';
import React, { Component } from 'react'
import TermsOfReference from './terms/TermsOfReference';
import VDRTabs from './tabs/VDRTabs';
import { setCookie, getCookie } from './utilities/cookies'
import axios from 'axios'

/**
 * Shows terms of reference if not already agreed to
 * Shows main app if terms of reference agreed to
 */

class AppContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cookieName: "TORAgreement",
            title: '',
            body: '',
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
        axios.get("../_api/Web/Lists/getbytitle('Config')/items?$filter=Key eq 'TOR'&$select=TextValue,MultiTextValue,Modified,NumberValue")
            .then(response => {
                this.updateState({
                    title: response.data.value[0].TextValue,
                    body: response.data.value[0].MultieTextValue,
                    modified: response.data.value[0].Modified,
                    cookieDays: response.data.value[0].NumberValue
                })
            }).catch(error => {
                console.warn('error expected outside of SharePoint environment', error)
                this.updateState({
                    title: 'VICO ToR Header',
                    body: 'VICO ToR Body'
                })
            })
    }

    render() {
        return (this.state.agree) ?
            <VDRTabs /> :
            <TermsOfReference
                title={this.state.title}
                body={this.state.body}
                handleAgree={this.handleAgree}
                handleDisagree={this.handleDisagree}
            />
    }
}

export default AppContent