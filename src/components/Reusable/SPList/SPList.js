import React, { useState, useEffect, Fragment } from 'react'
import MaterialTable from 'material-table'
import { SPDialog, getListAndItems } from 'Components'
import { icons } from 'Components'

export const SPList = ({
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
	deleteItem = true,
	editItem = true,
	changeItemPermission = true,
	customActions,
	options,
	isDirty = true,
	handleDirty = (dirty) => {
		console.warn(`handleDirty Default has been passed '${dirty}'`)
	},
	tableTitle,
}) => {
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const [title, setTitle] = useState('')
	const [actions, setActions] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [dialogTitle, setDialogTitle] = useState()
	const [dialogContent, setDialogContent] = useState()
	const [dialogSaveButtonText, setDialogSaveButtonText] = useState()
	const [dialogSaveAction, setDialogSaveAction] = useState()
	const [dialogCancelButtonText, setDialogCancelButtonText] = useState()
	const [dialogCancelAction, setDialogCancelAction] = useState()

	const saveButtonHandler = (results) => {
		addOptions.saveAction(results)
		handleDirty(true)
		setDialogOpen(false)
	}

	const cancelButtonHandler = (results) => {
		addOptions.cancelAction(results)
		setDialogOpen(false)
	}

	useEffect(() => {
		if (addItem) {
			setActions((prevActions) => {
				prevActions.push({
					icon: icons.Add,
					tooltip: 'Add Item',
					isFreeAction: true,
					onClick: (event, rowdata) => {
						setDialogTitle(addOptions.title)
						setDialogContent(addOptions.content)
						setDialogSaveButtonText(addOptions.saveButtonText)

						setDialogCancelButtonText(addOptions.cancelButtonText)
						setDialogCancelAction(() => {
							return () => {
								setIsLoading(false)
								addOptions.cancelAction()
							}
						})
						setDialogOpen(true)
					},
				})

				return prevActions
			})
		}

		if (deleteItem) {
			setActions((prevActions) => {
				prevActions.push({
					icon: icons.Delete,
					tooltip: 'Delete Item',
					onClick: (event, rowdata) => {
						//TODO: delete item actions
					},
				})

				return prevActions
			})
		}

		if (editItem) {
			setActions((prevActions) => {
				prevActions.push({
					icon: icons.Edit,
					tooltip: 'Edit Item',
					onClick: (event, rowdata) => {
						//TODO: edit item actions
					},
				})

				return prevActions
			})
		}

		if (changeItemPermission) {
			setActions((prevActions) => {
				prevActions.push({
					icon: icons.People,
					tooltip: 'Change Item Permissions',
					onClick: (event, rowdata) => {
						//TODO: change item permissions actions
					},
				})

				return prevActions
			})
		}

		if (customActions) {
			customActions.map((action, index) => {
				action.icon = icons[action.icon]

				return setActions((prevActions) => {
					prevActions.push(action)
					return prevActions
				})
			})
		}
		return () => {}
	}, [])

	const populateTable = async () => {
		setIsLoading(true)

		const list = await getListAndItems(listName)

		if (tableTitle) {
			setTitle(tableTitle)
		} else {
			setTitle(list.title)
		}

		setColumns(list.columns)
		setData(list.items)

		handleDirty(false)

		setIsLoading(false)
	}

	useEffect(() => {
		if (isDirty) {
			populateTable()
		}

		return () => {}
	}, [isDirty])

	return (
		<Fragment>
			<MaterialTable
				columns={columns}
				data={data}
				title={title}
				options={options}
				actions={actions}
				isLoading={isLoading}
			/>
			<SPDialog
				open={dialogOpen}
				title={dialogTitle}
				content={dialogContent}
				saveButtonText={dialogSaveButtonText}
				saveButtonAction={saveButtonHandler}
				cancelButtonText={dialogCancelButtonText}
				cancelButtonAction={cancelButtonHandler}
			/>
		</Fragment>
	)
}
