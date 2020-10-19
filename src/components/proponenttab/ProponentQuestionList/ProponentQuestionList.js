import React, { useState, Fragment } from 'react'
import { Grid, Paper } from '@material-ui/core'

import { SPTable, tableOptions, classes, AskQuestionDialog, icons } from 'Components'

import { useSnackbar } from 'notistack'

export const ProponentQuestionList = ({ proponentId, groupId, proponentName }) => {
	const listName = `${proponentId}_Questions`

	const [askQuestionDialog, setAskQuestionDialog] = useState(false)
	const [refresh, setRefresh] = useState(true)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const closeDialog = () => {
		setAskQuestionDialog(false)
		setRefresh(!refresh)
	}

	const questionOptions = {
		listName: listName,
		tableTitle: 'Our Submitted Questions',
		options: tableOptions,
		deleteItem: false,
		addItem: false,
		editItem: false,
		changeItemPermissions: false,
		customActions: [
			{
				icon: icons.Add,
				tooltip: 'Add Item',
				isFreeAction: true,
				onClick: (event, rowdata) => {
					setAskQuestionDialog(true)
				},
			},
		],
	}

	return (
		<Fragment>
			<Grid key={`${proponentId}QuestionList`} item xs={6}>
				<Paper className={classes.paper}>
					<SPTable {...questionOptions} refresh={refresh} />
				</Paper>
			</Grid>
			<AskQuestionDialog
				open={askQuestionDialog}
				closeDialog={closeDialog}
				listName={listName}
				proponentName={proponentName}
				groupId={groupId}
			/>
		</Fragment>
	)
}
