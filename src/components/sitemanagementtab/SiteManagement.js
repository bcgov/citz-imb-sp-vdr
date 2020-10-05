import React, { useState, Fragment } from 'react'
import { SPList, SPDialog, icons } from 'Components'
import { DialogContentText, TextField } from '@material-ui/core'

export const SiteManagement = () => {
	const listName = 'Config'

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		//actionsColumnIndex: -1,
	}

	const editOptions = {
		content: 'Do not change the Key',
	}

	const customActions = []

	const [isDirty, setIsDirty] = useState(true)
	const [dialogParameters, setDialogParameters] = useState({ open: false })

	const handleDirty = (newDirty) => {
		setIsDirty(newDirty)
	}

	return (
		<Fragment>
			<SPList
				listName={listName}
				addItem={false}
				deleteItem={false}
				editItem={true}
				changeItemPermission={false}
				customActions={customActions}
				options={options}
				isDirty={isDirty}
				handleDirty={handleDirty}
				editOptions={editOptions}
			/>
		</Fragment>
	)
}
