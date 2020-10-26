import React, { useState } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { SPTable, tableOptions, classes } from 'Components'

export const PublicQuestionList = () => {
	const listOptions = {
		listName: 'Questions',
		tableTitle: 'Public Questions',
		addItem: false,
		deleteItem: false,
		editItem: false,
		changeItemPermissions: false,
		options: {
			cellStyle: {
			padding: '4px'
		}}
	}

	return (
		<Grid key={'Questions'} item xs={6}>
			<Paper className={classes.paper}>
				<SPTable {...listOptions} />
			</Paper>
		</Grid>
	)
}
