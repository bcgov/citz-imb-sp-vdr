import React, { useState } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { ListTable, tableOptions, classes } from 'Components'

export const PublicLibrary = () => {
	const libraryOptions = {
		listName: 'Documents',
		columnFiltering: false,
		tableTitle: 'Public Documents',
	}

	return (
		<Grid key={'Documents'} item xs={6}>
			<Paper className={classes.paper}>
				<ListTable {...libraryOptions} />
			</Paper>
		</Grid>
	)
}
