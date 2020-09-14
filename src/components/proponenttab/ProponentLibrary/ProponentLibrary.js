import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import { SPList, LogAction, tableOptions, classes } from 'Components'

export const ProponentLibrary = ({ proponent }) => {
	const libraryOptions = {
		listName: proponent,
		tableTitle: 'Our Submitted Documents',
		options: tableOptions,
		addItem: true,
		addOptions: {
			title: 'Submit a Document',
			content: 'content',
			saveButtonText: 'Save',
			saveAction: (results) => {
				console.warn('saveAction :>> ', results)
			},
			cancelButtonText: 'Cancel',
			cancelAction: (results) => {
				console.warn('cancelAction :>> ', results)
			},
		},
		deleteItem: false,
		editItem: false,
		changeItemPermission: false,
		// customActions:[],

		handleDirty: (newDirty) => {
			//setListIsDirty(newDirty)
		},
	}

	return (
		<Grid key={`${proponent}Library`} item xs={6}>
			<Paper className={classes.paper}>
				<SPList {...libraryOptions} />
			</Paper>
		</Grid>
	)
}
