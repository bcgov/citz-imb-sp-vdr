import React, { useState } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { SPTable, tableOptions, classes } from 'Components'

export const PublicLibrary = () => {
	const libraryOptions = {
		listName: 'Documents',
		tableTitle: 'Public Documents',
		options: tableOptions,
		addItem: false,
		deleteItem: false,
		editItem: false,
		changeItemPermissions: false,
	}

	return (
		<Grid key={'Documents'} item xs={6}>
			<Paper className={classes.paper}>
				<SPTable {...libraryOptions} />
			</Paper>
		</Grid>
	)
}
