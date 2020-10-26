import React, { useState, Fragment } from 'react'
import { Grid, Paper } from '@material-ui/core'

import {
	AskQuestionDialog,
	classes,
	icons,
	SPTable,
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

	const closeDialog = () => {
		setAskQuestionDialog(false)
		setViewAnswerDialog(false)
		setRefresh(!refresh)
	}
	const openAnswerDialog = (itemId) => {
		setCurrentItemId(itemId)
		setViewAnswerDialog(true)
	}

	const questionOptions = {
		listName: listName,
		tableTitle: 'Our Submitted Questions',
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
		additionalData: (list) => {
			const items = list.items.map((item) => {
				let newItem = item
				if (item.Answer)
					newItem.Answer = (
						<ViewAnswerButton
							itemId={item.Id}
							onClick={openAnswerDialog}
						/>
					)
				return newItem
			})
			return list
		},
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
			<ViewAnswerDialog
				open={viewAnswerDialog}
				closeDialog={closeDialog}
				listName={listName}
				itemId={currentItemId}
			/>
		</Fragment>
	)
}
