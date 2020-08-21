import React, { useState } from 'react'
import { Container, Grid, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SPList, LogAction, tableOptions } from 'Components'

export const ProponentLibrary = ({proponent}) => {
	// const [libraryName, setLibraryName] = useState()
	// const [libraryIsDirty, setLibraryIsDirty] = useState(true)

	const classes = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
		},
		paper: {
			height: 140,
			width: 100,
		},
		control: {
			padding: theme.spacing(2),
		},
	}))

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
				console.log('saveAction :>> ', results)
			},
			cancelButtonText: 'Cancel',
			cancelAction: (results) => {
				console.log('cancelAction :>> ', results)
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
