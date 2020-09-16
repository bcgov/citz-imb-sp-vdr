import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'

import { SPList, tableOptions, classes } from 'Components'
import { AskQuestion } from 'Components'

export const ProponentQuestionList = ({ proponent, group }) => {
	const listName = `${proponent}_Questions`

	const [question, setQuestion] = useState()
	const [listIsDirty, setListIsDirty] = useState(true)

	const handleDirty = (newDirty) => {
		setListIsDirty(newDirty)
	}

	const askQuestion = () => {
		AskQuestion({ question, listName, proponent, group, handleDirty })
	}

	const questionOptions = {
		listName: listName,
		tableTitle: 'Our Submitted Questions',
		options: tableOptions,
		addItem: true,
		addOptions: {
			title: 'Submit a Question',
			content: (
				<TextField
					autoFocus
					margin='dense'
					id='questionSubmission'
					label='Question'
					type='text'
					fullWidth
					onChange={(e) => {
						setQuestion(e.target.value)
					}}
				/>
			),
			saveButtonText: 'Save',
			saveAction: askQuestion,
			cancelButtonText: 'Cancel',
			cancelAction: (results) => {
				console.warn('cancelAction :>> ', results)
			},
		},
		deleteItem: false,
		editItem: false,
		changeItemPermission: false,
		// customActions:[],

	}

	return (
		<Grid key={`${proponent}QuestionList`} item xs={6}>
			<Paper className={classes.paper}>
				<SPList isDirty={listIsDirty} handleDirty={handleDirty}  {...questionOptions} />
			</Paper>
		</Grid>
	)
}