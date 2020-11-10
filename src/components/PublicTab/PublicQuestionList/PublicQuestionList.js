import React, { useState } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { ListTable, tableOptions, classes } from 'Components'

export const PublicQuestionList = () => {
	const listOptions = {
		listName: 'Questions',
		columnFiltering: false,
		tableTitle: 'Public Questions',
	}

	return (
		<Grid key={'Questions'} item xs={6}>
			<Paper className={classes.paper}>
				<ListTable {...listOptions} />
			</Paper>
		</Grid>
	)
}
