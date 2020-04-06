import React, { Fragment } from "react"
import { Dialog, DialogTitle, IconButton, DialogContent } from "@material-ui/core"
import { SPGroup } from '../../sharepoint/SPGroup'

import CloseIcon from "@material-ui/icons/Close"

export const UsersDialog = ({ open, groupId, proponentName, handleClose }) => {
	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1
	}

	return (
		<Fragment>
			<Dialog open={open} maxWidth='md' onClose={handleClose}>
				<DialogTitle id='form-dialog-title'>
					User accounts for {proponentName}
					<IconButton aria-label='close' onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<SPGroup
						groupId={groupId}
						addUser={true}
						removeUser={true}
						editGroup={false}
						//customActions={customActions}
						options={options}
					/>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}
