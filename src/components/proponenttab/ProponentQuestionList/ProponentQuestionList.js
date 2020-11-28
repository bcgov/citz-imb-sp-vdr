import React, { useState, useContext, Fragment } from 'react'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { UserContext } from 'Components'

import {
	// AskQuestionDialog,
	classes,
	ListTable,
	// ViewAnswerButton,
	// ViewAnswerDialog,
} from 'Components'

export const ProponentQuestionList = () => {

const currentUser = useContext(UserContext)

const listOptions = {
	listName: `${currentUser.proponent}_Questions`,
	columnFiltering: false,
	showTitle: false,
}

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
		tableTitle: 'Our Submitted Questions',
		refresh: refresh,
		initialState: { sortBy: [{ id: 'Created', desc: true }] },
		columnFiltering: false,
		customColumns: [
			{
				accessor: 'Answer',
				Cell: ({ value }) => {
					return value
						? // <ViewAnswerButton
						  // 	itemId={value}
						  // 	onClick={openAnswerDialog}
						  // />
						  null
						: null
				},
			},
		],
		customActions: [
			{
				render: (
					<IconButton
						onClick={() => {
							setAskQuestionDialog(true)
						}}>
						<AddIcon />
					</IconButton>
				),
				tooltip: 'Submit Question',
				isFreeAction: true,
			},
		],
	}

	return (
		<Fragment>
			<ListTable {...listOptions} />
			{/* <AskQuestionDialog
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
			/> */}
		</Fragment>
	)
}
