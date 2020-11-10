import React, { useState, Fragment } from 'react'
import { Grid, Paper } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import {
	AskQuestionDialog,
	classes,
	ListTable,
	ViewAnswerButton,
	ViewAnswerDialog,
} from 'Components'

export const ProponentQuestionList = ({
	proponentId,
	groupId,
	proponentName,
}) => {
	const listName = `${proponentId}_Questions`

	const [refresh, setRefresh] = useState(true)
	const [askQuestionDialog, setAskQuestionDialog] = useState(false)
	const [viewAnswerDialog, setViewAnswerDialog] = useState(false)
	const [currentItemId, setCurrentItemId] = useState()

	const closeAnswerDialog = () => {
		setViewAnswerDialog(false)
	}
	const closeQuestionDialog = () => {
		setAskQuestionDialog(false)
		setRefresh(!refresh)
	}

	const openAnswerDialog = (itemId) => {
		setCurrentItemId(itemId)
		setViewAnswerDialog(true)
	}

	const questionOptions = {
		listName: listName,
		tableTitle: 'Our Submitted Questions',
		refresh: refresh,
		initialState: { sortBy: [{ id: 'Created', desc: true }] },
		columnFiltering: false,
		customColumns: [
			{
				accessor: 'Answer',
				Cell: ({ value }) => {
					return value ? (
						<ViewAnswerButton
							itemId={value}
							onClick={openAnswerDialog}
						/>
					) : null
				},
			},
		],
		customActions: [
			{
				icon: <AddIcon />,
				tooltip: 'Submit Question',
				isFreeAction: true,
				onClick: () => {
					setAskQuestionDialog(true)
				},
			},
		],
	}

	return (
		<Fragment>
			<Grid key={`${proponentId}QuestionList`} item xs={6}>
				<Paper className={classes.paper}>
					<ListTable {...questionOptions} />
				</Paper>
			</Grid>
			<AskQuestionDialog
				open={askQuestionDialog}
				closeDialog={closeQuestionDialog}
				listName={listName}
				proponentName={proponentName}
				groupId={groupId}
			/>
			<ViewAnswerDialog
				open={viewAnswerDialog}
				closeDialog={closeAnswerDialog}
				listName={listName}
				itemId={currentItemId}
			/>
		</Fragment>
	)
}
