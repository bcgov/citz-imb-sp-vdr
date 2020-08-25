import React, { useState } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { SPList, tableOptions, classes } from 'Components'

export const PublicQuestionList = () => {
	const listOptions = {
		listName: 'Questions',
		tableTitle: 'Public Questions',
		options: tableOptions,
		addItem: false,
		deleteItem: false,
		editItem: false,
		changeItemPermission: false,
	}
	const [isDirty, setIsDirty] = useState(true)
	const handleDirty = (newDirty) => {
		setIsDirty(newDirty)
	}
	return (
		<Grid key={'Questions'} item xs={6}>
			<Paper className={classes.paper}>
				<SPList
					isDirty={isDirty}
					handleDirty={handleDirty}
					{...listOptions}
				/>
			</Paper>
		</Grid>
	)
}
