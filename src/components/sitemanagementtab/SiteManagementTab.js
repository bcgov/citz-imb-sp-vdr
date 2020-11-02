import React, { useState, useReducer, useEffect, Fragment } from 'react'
import { LogAction, FormikDialog, ViewActivityLog } from 'Components'
import { ListItem, List } from '@material-ui/core'
import * as Yup from 'yup'
import { GetListItems, UpdateListItem } from 'citz-imb-sp-utilities'
import { useSnackbar } from 'notistack'

export const SiteManagementTab = () => {
	const listName = 'Config'

	const [listItems, setListItems] = useState([])
	const [items, setItems] = useState({})
	const [viewActivityLogDialog, setViewActivityLogDialog] = useState(false)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const initialDialogProps = {
		fields: [],
		onSubmit: () => {},
		open: false,
		close: () => {},
		title: '',
		instructions: '',
	}

	const handleSave = async (key, newValues, setSubmitting) => {
		console.log('handleSave :>> ', { key, newValues })
		try {
			await UpdateListItem({ listName, items: newValues })
			dialogDispatch('reset')
			LogAction(`updated '${key}'`)
			enqueueSnackbar(`${key} updated successfully`, {
				variant: 'success',
			})
		} catch (error) {
			console.error('Error in handleSave', error)
			enqueueSnackbar(`${key} did not update: ${error}`, {
				variant: 'error',
			})
			setSubmitting(false)
		}
	}

	const dialogReducer = (state, action) => {
		switch (action) {
			case 'TOS':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Title',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'NumberValue',
							label: 'Days until re-prompt',
							initialValue: items[action].NumberValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id
						handleSave(action, values, setSubmitting)
					},
					open: true,
					close: () => {
						dialogDispatch('reset')
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				}
			case 'addUserEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id
						handleSave(action, values, setSubmitting)
					},
					open: true,
					close: () => {
						dialogDispatch('reset')
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				}
			case 'contactemail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Contact Email',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string()
								.required('Required')
								.email('Must be a valid email'),
							control: 'input',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						//console.log('onSubmit :>> ', { values, thing })
						values.Id = items[action].Id
						handleSave(action, values, setSubmitting)
					},
					open: true,
					close: () => {
						dialogDispatch('reset')
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				}
			case 'addQuestionEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id
						handleSave(action, values, setSubmitting)
					},
					open: true,
					close: () => {
						dialogDispatch('reset')
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				}
			case 'newQuestionEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id
						handleSave(action, values, setSubmitting)
					},
					open: true,
					close: () => {
						dialogDispatch('reset')
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				}
			case 'newAnswerEmail':
				return {
					fields: [
						{
							name: 'TextValue',
							label: 'Subject Line',
							initialValue: items[action].TextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'input',
							required: true,
						},
						{
							name: 'MultiTextValue',
							label: 'Body',
							initialValue: items[action].MultiTextValue,
							validationSchema: Yup.string().required('Required'),
							control: 'textarea',
							required: true,
						},
					],
					onSubmit: (values, { setSubmitting }) => {
						values.Id = items[action].Id
						handleSave(action, values, setSubmitting)
					},
					open: true,
					close: () => {
						dialogDispatch('reset')
					},
					title: items[action].Title,
					instructions: items[action].Instructions,
				}
			case 'reset':
				return initialDialogProps
			case 'viewActivityLog':
				setViewActivityLogDialog(true)
				return initialDialogProps
			default:
				console.log(`${action} not defined`)
				return state
		}
	}

	const [dialogProps, dialogDispatch] = useReducer(
		dialogReducer,
		initialDialogProps
	)

	const getItems = async () => {
		const configItems = await GetListItems({ listName })
		let itemRenders = configItems.map((item) => {
			return (
				<ListItem
					key={item.Key}
					onClick={() => {
						dialogDispatch(item.Key)
					}}
					id={item.Key}
					button
					divider>
					Edit {item.Title}
				</ListItem>
			)
		})

		itemRenders.push(
			<ListItem
				key={'viewActivityLog'}
				onClick={() => {
					dialogDispatch('viewActivityLog')
				}}
				id={'viewActivityLog'}
				button
				divider>
				View Activity Log
			</ListItem>
		)

		let itemObject = {}

		for (let i = 0; i < configItems.length; i++) {
			itemObject[configItems[i].Key] = {
				Key: configItems[i].Key,
				MultiTextValue: configItems[i].MultiTextValue,
				NumberValue: configItems[i].NumberValue,
				TextValue: configItems[i].TextValue,
				YesNoValue: configItems[i].YesNoValue,
				Title: configItems[i].Title,
				Instructions: configItems[i].Instructions,
				Id: configItems[i].Id,
			}
		}
		setItems(itemObject)
		setListItems(itemRenders)
	}

	useEffect(() => {
		getItems()
		return () => {}
	}, [])

	return (
		<Fragment>
			<List>{listItems.map((item) => item)}</List>
			<FormikDialog {...dialogProps} />
			<ViewActivityLog
				open={viewActivityLogDialog}
				close={() => {
					setViewActivityLogDialog(false)
				}}
			/>
		</Fragment>
	)
}
