import React, { useState } from 'react'
import { Container, Grid, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
	GetCurrentUser,
	GetListItems,
	AddItemsToList,
	GetGroupMembers,
	SendEmail,
} from 'citz-imb-sp-utilities'
import { SPList, LogAction, tableOptions } from 'Components'

export const ProponentQuestionList = ({ proponent }) => {
	const [question, setQuestion] = useState()
	const [listIsDirty, setListIsDirty] = useState(true)

	const classes = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
		},
		paper: {
			height: 140,
			width: 100,
		},
		control: {
			padding: theme.spacing(2),
		},
	}))

	const questionOptions = {
		listName: `${proponent}_Questions`,
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
			saveAction: (results) => {
				AddItemsToList({
					listName: questionOptions.listName,
					items: {
						Title: question,
					},
				}).then((response) => {
					LogAction(`asked '${question}'`)
					setListIsDirty(true)
					// GetGroupMembers({ groupId: group }).then((response) => {
					// 	let emails = response.map((user) => {
					// 		return user.Email
					// 	})

					// 	SendEmail({
					// 		to: emails,
					// 		subject: 'test subject',
					// 		body: 'test body',
					// 	})
					// })
				})
			},
			cancelButtonText: 'Cancel',
			cancelAction: (results) => {
				console.log('cancelAction :>> ', results)
			},
		},
		deleteItem: false,
		editItem: false,
		changeItemPermission: false,
		// customActions:[],
		isDirty: listIsDirty,
		handleDirty: (newDirty) => {
			setListIsDirty(newDirty)
		},
	}

	return (
		<Grid key={`${proponent}QuestionList`} item xs={6}>
			<Paper className={classes.paper}>
				<SPList {...questionOptions} />
			</Paper>
		</Grid>
	)
}
