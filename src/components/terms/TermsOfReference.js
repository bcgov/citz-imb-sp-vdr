import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core'
/**
 * present the terms of service
 * @param {p} props
 */
export default function TermsOfReference({ title, body, handleAgree, handleDisagree}) {
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
                {title}
            </DialogTitle>
            <DialogContent
                dividers={true}
            >
                <div dangerouslySetInnerHTML={{ __html: body }} />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleAgree}
                    color="primary"
                    variant='contained'
                >
                    Agree
                </Button>
                <Button
                    onClick={handleDisagree}
                    color="primary"
                    variant='outlined'
                >
                    Disagree
                </Button>
            </DialogActions>

        </Dialog>
    )
}
