import React, { Component } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { setCookie } from '../utilities/cookies'
import $ from 'jquery'

export class TermsOfReference extends Component {
    constructor(props) {
        super(props)
        console.log("props", props)
        this.state = {
            title: 'VICO Terms of Reference',
            body: 'Do not steal this stuff',
            modified: 'insertmoment',
            cookieDays: 1,
            cookie: props.cookieName
        }
    }

    handleAgree = () => {
        console.log("handleAgree")

        this.setState({
            cookie: this.props.cookieName + this.state.modified
        })

        setCookie(this.state.cookie, "true", this.state.cookieDays);
        this.props.successCallback(this.state.cookie)
    }

    handleDisagree = () => {
        window.close()
        window.location = '/_layouts/signout.aspx'
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
                modified: data.d.results[0].modified,
                cookieDays: data.d.results[0].NumberValue
            })
            this.props.successCallBack({ modified: data.d.results[0].modified })
        }).fail(function (err) {
            window.console && console.warn("Error is Expected if page loaded outside sharepoint", err);
        });
    }

    render() {
        return (
            <Dialog
                open={true}
                scroll={'paper'}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                aria-labelledby="tor-dialog-title"
                aria-describedby="tor-dialog-description"
            >
                <DialogTitle id="tor-dialog-title">
                    {this.state.title}
                </DialogTitle>
                <DialogContent
                    dividers={true}
                >
                    <div dangerouslySetInnerHTML={{ __html: this.state.body }} />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={this.handleAgree}
                        color="primary"
                        variant='contained'
                    >
                        Agree
                    </Button>
                    <Button
                        onClick={this.handleDisagree}
                        color="primary"
                        variant='outlined'
                    >
                        Disagree
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }
}

export default TermsOfReference
