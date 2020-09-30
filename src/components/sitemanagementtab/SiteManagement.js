import React, { useState, useEffect, Fragment } from 'react'
import { getListAndItems } from 'Components'
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	ListItem,
	TextField,
	List,
} from '@material-ui/core'

export const SiteManagement = () => {
	const listName = 'Config'

	const [listItems, setListItems] = useState([])
	const [config, setConfig] = useState({})
	const [dialogOptions, setDialogOptions] = useState({ open: false })
	const [title, setTitle] = useState()
	const [textValue, setTextValue] = useState()
	const [multiTextValue, setMultiTextValue] = useState()
	const [numberValue, setNumberValue] = useState()
	const [yesNoValue, setYesNoValue] = useState()

	useEffect(() => {
		console.log('title', title)
		console.log('textValue', textValue)
		console.log('multiTextValue', multiTextValue)
		console.log('numberValue', numberValue)
		console.log('yesNoValue', yesNoValue)

		return () => {}
	}, [textValue])

	const getRender = (item) => {
		switch (item.Key) {
			case 'TOS':
				return (
					<Fragment>
						<DialogTitle>{item.Title}</DialogTitle>
						<DialogContent>
							<DialogContentText>
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
								onChange={(props)=>{setTextValue(props.target.value)}}
							/>
							<TextField
								id='TOS_Days'
								label='Days until TOS Prompt'
								defaultValue={item.NumberValue}
								fullWidth={true}
								onChange={(props)=>{setNumberValue(props.target.value)}}
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
								onChange={(props)=>{setMultiTextValue(props.target.value)}}
							/>
						</DialogContent>
					</Fragment>
				)
			case 'addUserEmail':
				return (
					<Fragment>
						<DialogTitle>{item.Title}</DialogTitle>
						<DialogContent>
							<DialogContentText>
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
								onChange={(props)=>{setTextValue(props.target.value)}}
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
								onChange={(props)=>{setMultiTextValue(props.target.value)}}
							/>
						</DialogContent>
					</Fragment>
				)
			case 'contactemail':
				return (
					<Fragment>
						<DialogTitle>{item.Title}</DialogTitle>
						<DialogContent>
							<DialogContentText>
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
								onChange={(props)=>{setTextValue(props.target.value)}}
							/>
						</DialogContent>
					</Fragment>
				)

			default:
				return <div>Key not Found</div>
		}
	}

	const getItems = async () => {
		const list = await getListAndItems(listName)
		setListItems(list.items)

		let listObject = {}
		list.items.map((item) => {
			console.log('item :>> ', item)
			listObject[item.Key] = item
			listObject[item.Key].render = getRender(item)
			setConfig(listObject)
		})
	}

	useEffect(() => {
		getItems()
		return () => {}
	}, [])

	const handleClick = (element) => {
		const configKey = element.target.attributes.id.value

		setTitle(config[configKey].Title)
		setTextValue(config[configKey].TextValue)
		setMultiTextValue(config[configKey].MultiTextValue)
		setNumberValue(config[configKey].NumberValue)
		setYesNoValue(config[configKey].YesNoValue)

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
							Edit {item.Key}
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
				<Dialog {...dialogOptions}>
					{dialogOptions.content}

					<DialogActions>Actions</DialogActions>
				</Dialog>
			</List>
		</Fragment>
	)
}
