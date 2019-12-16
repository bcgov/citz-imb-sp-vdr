import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export class TermsOfReference extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogContent: 'Don\'t Steal this stuff.'
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
                <DialogTitle id="tor-dialog-title">Terms of Reference</DialogTitle>
                <DialogContent
                    dividers={true}
                    children={this.state.dialogContent}
                >
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
