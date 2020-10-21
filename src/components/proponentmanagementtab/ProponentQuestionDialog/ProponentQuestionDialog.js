import React, { Fragment, useState } from 'react'
import {
	SPDialog,
	SPTable,
	AnswerQuestionDialog,
	ViewQuestionDialog,
} from 'Components'
import { Button } from '@material-ui/core'

export const ProponentQuestionDialog = ({
	proponentName,
	open,
	listName,
	closeDialog,
}) => {
	const [answerDialog, setAnswerDialog] = useState(false)
	const [question, setQuestion] = useState('')
	const [questionId, setQuestionId] = useState()
	const [refresh, setRefresh] = useState(true)

	const closeAnswerDialog = () => {
		setRefresh(!refresh)
		setAnswerDialog(false)
	}

	const customActions = [
		(rowData) => {
			if (rowData.Answer === null) {
				return {
					icon: () => {
						return (
							<Button
								color='secondary'
								size='small'
								variant='contained'>
								Answer
							</Button>
						)
					},
					tooltip: 'Submit Answer',
					onClick: (event, rowdata) => {
						setQuestion(rowdata.Title)
						setQuestionId(rowdata.Id)
						setAnswerDialog(true)
					},
				}
			} else {
				return {
					icon: () => {
						return (
							<Button
								color='primary'
								size='small'
								variant='outlined'>
								View
							</Button>
						)
					},
					tooltip: 'View Answer',
					onClick: (event, rowdata) => {
						console.log('custom action>>', event, rowdata)
					},
				}
			}
		},
	]

	return (
		<Fragment>
			<SPDialog
				open={open}
				title={proponentName}
				showSave={false}
				cancelButtonText={'Close'}
				cancelButtonAction={closeDialog}
				fullScreen={true}>
				<SPTable
					listName={listName}
					tableTitle={'Questions'}
					addItem={false}
					deleteItem={false}
					editItem={false}
					changeItemPermissions={false}
					customActions={customActions}
					refresh={refresh}
				/>
			</SPDialog>
			<AnswerQuestionDialog
				open={answerDialog}
				close={closeAnswerDialog}
				listName={listName}
				questionId={questionId}
				question={question}
			/>
			<ViewQuestionDialog />
		</Fragment>
	)
}
