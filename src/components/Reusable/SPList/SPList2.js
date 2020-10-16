import React, { useReducer, useState, useEffect, Fragment } from 'react'
import { SPTable } from 'Components'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	DialogContentText,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'

export const SPList2 = ({
	listName,
	addItem = true,
	addOptions = {
		title: 'Add Item',
		content: 'Content',
		saveButtonText: 'Save',
		saveAction: () => {
			console.warn('I am saved')
		},

		cancelButtonText: 'Cancel',
		cancelAction: () => {
			console.warn('I am lost')
		},
	},
	isValid = () => {
		console.warn('default isValid always returns true')
		return true
	},
	validationText = 'validate',
	deleteItem = true,
	editItem = true,
	editOptions = {
		title: 'Edit Item',
		content: 'Content',
		saveButtonText: 'Save',
		saveAction: () => {
			console.warn('I am saved')
		},
		cancelButtonText: 'Cancel',
		cancelAction: () => {
			console.warn('I am lost')
		},
	},
	changeItemPermission = true,
	customActions,
	tableOptions,
	isDirty = true,
	preLoad = false,
	handleDirty = (dirty) => {
		console.warn(`handleDirty Default has been passed '${dirty}'`)
	},
	handlePreLoad = (preLoad) => {
		console.warn(`handlePreLoad Default has been passed '${preLoad}'`)
	},
	tableTitle,
	additionalData = (list) => {
		return list
	},
}) => {
	const saveHandler = () => {}
	const cancelHandler = () => {
		dialogDispatch({ type: 'CLOSE' })
	}

	const dialogInitialState = {
		open: false,
		title: <DialogTitle id='form-dialog-title'></DialogTitle>,
		content: <DialogContent></DialogContent>,
		actions: (
			<DialogActions>
				<Button onClick={saveHandler}>Save</Button>
				<Button onClick={cancelHandler}>Cancel</Button>
			</DialogActions>
		),
		cancelButtonAction: () => {
			console.log('default dialog cancel action')
		},
	}

	const dialogReducer = (state, action) => {
		switch (action.type) {
			case 'OPEN':
				return { ...state, open: true }
			case 'CLOSE':
				return { ...state, open: false }
			case 'addItem':
				return {
					...state,
					open: true,
					content: (
						<DialogContent>
							{addOptions.contents}
						</DialogContent>
					),
					title: (
						<DialogTitle id='form-dialog-title'>
							{addOptions.title}
						</DialogTitle>
					),
				}
			default:
				console.log('dialogReducer', { action, state })
				return state
		}
	}

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const [dialogState, dialogDispatch] = useReducer(
		dialogReducer,
		dialogInitialState
	)

	const onClickCallback = (action, event, rowdata) => {
		dialogDispatch({ type: action, event, rowdata })
	}

	return (
		<Fragment>
			<SPTable
				listName={listName}
				tableOptions={tableOptions}
				addItem={true}
				deleteItem={false}
				editItem={false}
				changeItemPermissions={false}
				onClickCallback={onClickCallback}
				//customActions
			/>
			<Dialog
				open={dialogState.open}
				onClose={dialogState.cancelButtonAction}>
				{dialogState.title}
				{dialogState.content}
				{dialogState.actions}
			</Dialog>
		</Fragment>
	)
}
