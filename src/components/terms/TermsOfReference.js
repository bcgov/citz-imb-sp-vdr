import React, { Component } from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent, Button} from '@material-ui/core'

export class TermsOfReference extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    handleAgree = () => {
        this.props.agreementCallback(false)
    }

    handleDisagree = () => {
        window.close()
        window.location = '/_layouts/signout.aspx'
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
                    {this.props.title}
                </DialogTitle>
                <DialogContent
                    dividers={true}
                >
                    <div dangerouslySetInnerHTML={{ __html: this.props.body}}/>
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
