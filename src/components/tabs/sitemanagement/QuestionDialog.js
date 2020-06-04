import React from 'react'
import { Dialog, DialogTitle, IconButton, DialogContent } from "@material-ui/core"
import { SPList } from '../../sharepoint/SPList'
import CloseIcon from "@material-ui/icons/Close"

export const QuestionDialog = ({ open, listName, proponentName, handleClose }) => {
    const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1
    }

    return (
        <Dialog open={open} maxWidth='md' onClose={handleClose}>
            <DialogTitle id='form-dialog-title'>
					Submitted Questions for {proponentName}
					<IconButton aria-label='close' onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
            <DialogContent>
            <SPList
				listName={listName}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermission={false}
				//customActions={customActions}
				options={options}
			/>
            </DialogContent>
        </Dialog>
    )
}