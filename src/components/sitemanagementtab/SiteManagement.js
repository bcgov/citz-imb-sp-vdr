import React, { useState, useEffect, Fragment } from 'react'
import { GetListAndItems, SPTable, SPDialog, LogAction } from 'Components'
import { DialogContentText, ListItem, TextField, List } from '@material-ui/core'

import { UpdateListItem } from 'citz-imb-sp-utilities'
import { useSnackbar } from 'notistack'

export const SiteManagement = () => {
	const listName = 'Config'

	const [listItems, setListItems] = useState([])
	const [config, setConfig] = useState({})
	const [dialogOptions, setDialogOptions] = useState({ open: false })
	const [title, setTitle] = useState()
	const [key, setKey] = useState()
	const [itemId, setItemId] = useState()
	const [textValue, setTextValue] = useState()
	const [multiTextValue, setMultiTextValue] = useState()
	const [numberValue, setNumberValue] = useState()
	const [yesNoValue, setYesNoValue] = useState()
	const [groupValue, setGroupValue] = useState()
	const [instructions, setInstructions] = useState()
	const [dirty, setDirty] = useState(false)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const getRender = (item) => {
		switch (item.Key) {
			case 'TOS':
				return (
					<Fragment>
						<DialogContentText component='div'>
							<p
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}
							/>
						</DialogContentText>
						<TextField
							id='TOS_Title'
							label='Title'
							defaultValue={item.TextValue}
							fullWidth={true}
							onChange={(props) => {
								setTextValue(props.target.value)
							}}
						/>
						<TextField
							id='TOS_Days'
							label='Days until TOS Prompt'
							defaultValue={item.NumberValue}
							fullWidth={true}
							onChange={(props) => {
								setNumberValue(props.target.value)
							}}
						/>
						<TextField
							variant='outlined'
							id='TOS_body'
							label='Body'
							defaultValue={item.MultiTextValue}
							multiline={true}
							rows={6}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setMultiTextValue(props.target.value)
							}}
						/>
					</Fragment>
				)
			case 'addUserEmail':
				return (
					<Fragment>
						<DialogContentText component='div'>
							<p
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}
							/>
						</DialogContentText>
						<TextField
							variant='outlined'
							id='adduseremail_subject'
							label='Subject Line'
							defaultValue={item.TextValue}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setTextValue(props.target.value)
							}}
						/>
						<TextField
							variant='outlined'
							id='adduseremail_body'
							label='Body'
							defaultValue={item.MultiTextValue}
							multiline={true}
							rows={6}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setMultiTextValue(props.target.value)
							}}
						/>
					</Fragment>
				)
			case 'contactemail':
				return (
					<Fragment>
						<DialogContentText component='div'>
							<div
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}></div>
						</DialogContentText>
						<TextField
							id='contactemail'
							label='Contact Email'
							defaultValue={item.TextValue}
							fullWidth={true}
							onChange={(props) => {
								setTextValue(props.target.value)
							}}
						/>
					</Fragment>
				)
			case 'ActivityLog':
				return (
					<Fragment>
						<DialogContentText>
							<div
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}></div>
						</DialogContentText>
						<SPTable
							listName={'ActivityLog'}
							addItem={false}
							deleteItem={false}
							editItem={false}
							changeItemPermissions={false}
							options={{search: true}}
						/>
					</Fragment>
				)
			case 'addQuestionEmail':
				return (
					<Fragment>
						<DialogContentText component='div'>
							<p
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}
							/>
						</DialogContentText>
						<TextField
							variant='outlined'
							id='addQuestionEmail_subject'
							label='Subject Line'
							defaultValue={item.TextValue}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setTextValue(props.target.value)
							}}
						/>
						<TextField
							variant='outlined'
							id='addQuestionEmail_body'
							label='Body'
							defaultValue={item.MultiTextValue}
							multiline={true}
							rows={6}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setMultiTextValue(props.target.value)
							}}
						/>
					</Fragment>
				)
			case 'newQuestionEmail':
				return (
					<Fragment>
						<DialogContentText component='div'>
							<p
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}
							/>
						</DialogContentText>
						<TextField
							variant='outlined'
							id='newQuestionEmail_subject'
							label='Subject Line'
							defaultValue={item.TextValue}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setTextValue(props.target.value)
							}}
						/>
						<TextField
							variant='outlined'
							id='newQuestionEmail_body'
							label='Body'
							defaultValue={item.MultiTextValue}
							multiline={true}
							rows={6}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setMultiTextValue(props.target.value)
							}}
						/>
					</Fragment>
				)
			case 'newAnswerEmail':
				return (
					<Fragment>
						<DialogContentText component='div'>
							<p
								dangerouslySetInnerHTML={{
									__html: item.Instructions,
								}}
							/>
						</DialogContentText>
						<TextField
							variant='outlined'
							id='newQuestionEmail_subject'
							label='Subject Line'
							defaultValue={item.TextValue}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setTextValue(props.target.value)
							}}
						/>
						<TextField
							variant='outlined'
							id='newQuestionEmail_body'
							label='Body'
							defaultValue={item.MultiTextValue}
							multiline={true}
							rows={6}
							fullWidth={true}
							margin='normal'
							onChange={(props) => {
								setMultiTextValue(props.target.value)
							}}
						/>
					</Fragment>
				)
			default:
				return <div>Key not Found</div>
		}
	}

	const getItems = async () => {
		const list = await GetListAndItems(listName)
		setListItems(list.items)

		let listObject = {}
		const activityLog = {
			Key: 'ActivityLog',
			Title: 'Activity Log',
			Id: -1,
			TextValue: '',
			MultiTextValue: '',
			NumberValue: 0,
			YesNoValue: false,
			GroupValue: null,
			Instructions: '',
			render: getRender({ Key: 'ActivityLog' }),
		}

		list.items.map((item) => {
			listObject[item.Key] = item
			listObject[item.Key].render = getRender(item)
		})
		listObject.ActivityLog = activityLog
		listObject.ActivityLog.render = getRender(activityLog)
		setConfig(listObject)
	}

	const updateItem = async () => {
		await UpdateListItem({
			listName: listName,
			items: {
				Id: itemId,
				Title: title,
				Key: key,
				TextValue: textValue,
				MultiTextValue: multiTextValue,
				NumberValue: numberValue,
				YesNoValue: yesNoValue,
				GroupValue: groupValue,
				Instructions: instructions,
			},
		})
		LogAction(`updated ${title} in config list`)
		enqueueSnackbar(`updated ${title} in config list`, {
			variant: 'success',
		})
		getItems()
		setDialogOptions({ open: false })
		setDirty(false)
	}

	useEffect(() => {
		getItems()
		return () => {}
	}, [])

	useEffect(() => {
		if (dirty) {
			updateItem()
		}
	}, [dirty])

	const handleClick = (element) => {
		const configKey = element.target.attributes.id.value
		setTitle(config[configKey].Title)
		setKey(configKey)
		setItemId(config[configKey].Id)
		setTextValue(config[configKey].TextValue)
		setMultiTextValue(config[configKey].MultiTextValue)
		setNumberValue(config[configKey].NumberValue)
		setYesNoValue(config[configKey].YesNoValue)
		setGroupValue(config[configKey].GroupValue)
		setInstructions(config[configKey].Instructions)

		const options = {
			open: true,
			title: configKey,
			content: config[configKey].render,
			maxWidth: 'lg',
			onClose: () => {
				setDialogOptions({ open: false })
			},
		}

		setDialogOptions(options)
	}
	const handleClose = () => {
		setDialogOptions({ open: false })
	}

	const handleSave = (element) => {
		setDirty(true)
	}

	return (
		<Fragment>
			<List>
				{listItems.map((item) => {
					return (
						<ListItem
							key={item.Key}
							onClick={handleClick}
							id={item.Key}
							button
							divider>
							Edit {item.Title}
						</ListItem>
					)
				})}
				<ListItem
					key={'ActivityLog'}
					onClick={handleClick}
					id={'ActivityLog'}
					button
					divider>
					View Activity Log
				</ListItem>
			</List>
			<SPDialog
				open={dialogOptions.open}
				title={dialogOptions.title}
				saveButtonAction={handleSave}
				cancelButtonAction={handleClose}>
				{dialogOptions.content}
			</SPDialog>
		</Fragment>
	)
}
