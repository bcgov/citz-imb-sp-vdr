import React, { useEffect, useState } from 'react'
import {
	GetCurrentUser,
	GetListItems,
	AddItemsToList,
	GetGroupMembers,
	SendEmail
} from 'citz-imb-sp-utilities'
import { Container, Grid, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SPList } from '../../sharepoint/SPList'
import { LogAction } from '../../utilities/LogAction'

export const Private = () => {
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

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1,
	}

	const [libraryName, setLibraryName] = useState()
	const [listName, setListName] = useState()
	const [isLoaded, setIsLoaded] = useState(false)
	const [libraryIsDirty, setLibraryIsDirty] = useState(true)
	const [listIsDirty, setListIsDirty] = useState(true)
	const [question, setQuestion] = useState()
	const [group, setGroup] = useState()

	const questionOptions = {
		listName: listName,
		tableTitle: 'Our Submitted Questions',
		options: options,
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
					listName: listName,
					items: {
						Title: question,
					},
				}).then((response) => {
					LogAction(`asked '${question}'`)
					setListIsDirty(true)
					GetGroupMembers({ groupId: group }).then((response) => {
						let emails = response.map((user) => {
							return user.Email
						})

						SendEmail({
							to: emails,
							subject: 'test subject',
							body: 'test body'
						})
					})
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

		handleDirty: (newDirty) => {
			setListIsDirty(newDirty)
		},
	}

	const libraryOptions = {
		listName: libraryName,
		tableTitle: 'Our Submitted Documents',
		options: options,
		addItem: true,
		addOptions: {
			title: 'Submit a Document',
			content: 'content',
			saveButtonText: 'Save',
			saveAction: (results) => {
				console.log('saveAction :>> ', results)
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

		handleDirty: (newDirty) => {
			setListIsDirty(newDirty)
		},
	}

	useEffect(() => {
		Promise.all([
			GetCurrentUser({ expand: 'Groups' }),
			GetListItems({ listName: 'Proponents' }),
		]).then((response) => {
			const [currentUser, listItems] = response

			for (let i = 0; i < listItems.length; i++) {
				for (let j = 0; j < currentUser.Groups.results.length; j++) {
					if (
						currentUser.Groups.results[j].Id ===
						listItems[i].GroupId
					) {
						setLibraryName(listItems[i].UUID)
						setListName(`${listItems[i].UUID}_Questions`)
						setGroup(listItems[i].GroupId)
						setIsLoaded(true)
					}
				}
			}
		})

		return () => {}
	}, [])

	if (isLoaded) {
		return (
			<Container maxWidth='xl'>
				<Grid container className={classes.root} spacing={2}>
					<Grid item xs={12}>
						<Grid container justify='center' spacing={2}>
							<Grid key={libraryName} item xs={6}>
								<Paper className={classes.paper}>
									<SPList
										isDirty={libraryIsDirty}
										{...libraryOptions}
									/>
								</Paper>
							</Grid>
							<Grid key={listName} item xs={6}>
								<Paper className={classes.paper}>
									<SPList
										isDirty={listIsDirty}
										{...questionOptions}
									/>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		)
	} else {
		return (
			<Container maxWidth='xl'>
				<Grid container className={classes.root} spacing={2}>
					<Grid item xs={12}>
						<div>No associated Proponent</div>
					</Grid>
				</Grid>
			</Container>
		)
	}
}
