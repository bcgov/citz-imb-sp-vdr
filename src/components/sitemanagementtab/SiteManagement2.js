import React, { useState, useEffect, Fragment } from 'react'
import {
	GetListAndItems,
	SPTable,
	SPDialog,
	LogAction,
	EditTOS,
} from 'Components'
import { DialogContentText, ListItem, TextField, List } from '@material-ui/core'

import { UpdateListItem } from 'citz-imb-sp-utilities'
import { useSnackbar } from 'notistack'

export const SiteManagement = () => {
	const listName = 'Config'

	const [items, setItems] = useState({ listRender: [] })
	const [dialog, setDialog] = useState()
	const [currentItem, setCurrentItem] = useState()

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const updateCurrentItem = (field, newValue) => {
		//console.log('updateCurrentItem currentItem :>> ', currentItem)
		setCurrentItem((prevState) => {
			let newState = { ...prevState }
			newState[field] = newValue
			return newState
		})
	}

	const saveCurrentItem = (event) => {
		console.log('saveCurrentItem currentItem :>> ', currentItem)
	}

	const closeDialog = () => {
		setDialog(null)
	}

	const getItems = async () => {
		const list = await GetListAndItems(listName)

		let itemsObject = {
			listRender: [],
		}

		list.items.map((item) => {
			let editDialog
			switch (item.Key) {
				case 'TOS':
					editDialog = (
						<EditTOS
							open={true}
							title={item.Title}
							instructions={item.Instructions}
							textValue={item.TextValue}
							numberValue={item.NumberValue}
							multiTextValue={item.MultiTextValue}
							onValueChange={updateCurrentItem}
							saveAction={saveCurrentItem}
							closeAction={closeDialog}
						/>
					)
					break
				default:
					editDialog = null
			}

			itemsObject[item.Key] = item

			let listItemRender = (
				<ListItem
					key={item.Key}
					onClick={() => {
						setCurrentItem({
							TextValue: item.TextValue,
							NumberValue: item.NumberValue,
							MultiTextValue: item.MultiTextValue,
						})
						setDialog(editDialog)
					}}
					id={item.Key}
					button
					divider>
					Edit {item.Title}
				</ListItem>
			)

			itemsObject.listRender.push(listItemRender)
		})

		itemsObject['viewActivityLog'] = {}
		let listItemRender = (
			<ListItem
				key={'viewActivityLog'}
				onClick={() => {}}
				id={'viewActivityLog'}
				button
				divider>
				View Activity Log
			</ListItem>
		)

		itemsObject.listRender.push(listItemRender)

		setItems(itemsObject)
	}

	useEffect(() => {
		getItems()
		return () => {}
	}, [])

	useEffect(() => {
		console.log('useEffect currentItem :>> ', currentItem)
		return () => {}
	}, [currentItem])

	return (
		<Fragment>
			<List>{items.listRender.map((item) => item)}</List>
			{dialog}
		</Fragment>
	)
}
