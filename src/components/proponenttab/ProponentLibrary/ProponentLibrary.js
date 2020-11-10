import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import { ListTable, classes } from 'Components'

export const ProponentLibrary = ({ proponent }) => {
	const libraryOptions = {
		listName: proponent,
		columnFiltering: false,
		tableTitle: 'Our Submitted Documents',
		addItem: true,
		deleteItem: false,
		editItem: false,
		changeItemPermission: false,
	}

	return (
		<Grid key={`${proponent}Library`} item xs={6}>
			<Paper className={classes.paper}>
				<ListTable {...libraryOptions} />
			</Paper>
		</Grid>
	)
}
