import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core'
import {SPTable} from 'Components'

export const ProponentLibraryDialog = ({proponentName, open, listName, closeDialog}) => {
    return (
        <Dialog
			open={open}
			//onClose={cancelButtonAction}
			maxWidth={'md'}>
			<DialogTitle id='form-dialog-title'>{proponentName} Library</DialogTitle>
			<DialogContent>
                <SPTable
                listName={listName}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermissions={false}
				//				onClickCallback={onClickCallback}
                />
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Close</Button>
			</DialogActions>
		</Dialog>
    )
}
