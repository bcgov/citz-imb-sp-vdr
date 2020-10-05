import React, { useState, useEffect, Fragment } from 'react'
import MaterialTable from 'material-table'
import { SPDialog, getListAndItems, icons , RTEditor} from 'Components'
import {
	DialogContentText,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core'

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
	options,
	isDirty = true,
	preLoad = false,
	handleDirty = (dirty) => {
		console.warn(`handleDirty Default has been passed '${dirty}'`)
	},
	handlePreLoad = (preLoad) => {
		console.warn(`handlePreLoad Default has been passed '${preLoad}'`)
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
	const [rowValue, setRowValue] = useState()

	const saveButtonHandler = (results) => {
		handlePreLoad(true)
		addOptions.saveAction(results)
		handleDirty(true)
		setDialogOpen(false)
	}

	const cancelButtonHandler = (results) => {
		addOptions.cancelAction(results)
		setDialogOpen(false)
	}

	const editItemHandler = (event, rowdata) => {
		setDialogTitle(rowdata.Key)
		setDialogCancelAction(() => {
			setDialogOpen(false)
		})
		// showSave: false,
		// cancelButtonText: 'Close',
		// cancelButtonAction: () => {
		// 	setDialogParameters({ open: false })

		setDialogOpen(true)

		// content: (
		// 	<DialogContentText>
		// 		<div
		// 			dangerouslySetInnerHTML={{
		// 				__html: rowdata.Instructions,
		// 			}} />
		// 		<TextField
		// 			id='TextValue'
		// 			label='TextValue'
		// 			value={rowdata.TextValue}
		// 			fullWidth={true}
		// 			autoFocus={true}
		// 			margin='normal' />
		// 		<MUIRichTextEditor
		// 			label='MultiTextValue'
		// 			value={rowdata.MultiTextValue}
		// 			fullWidth={true}
		// 			multiline={true}
		// 			margin='normal' />
		// 		<TextField
		// 			id='NumberValue'
		// 			label='NumberValue'
		// 			value={rowdata.NumberValue}
		// 			fullWidth={true}
		// 			margin='normal' />
		// 		<TextField
		// 			id='YesNoValue'
		// 			label='YesNoValue'
		// 			value={rowdata.YesNoValue}
		// 			fullWidth={true}
		// 			margin='normal' />
		// 		<TextField
		// 			id='GroupValueId'
		// 			label='GroupValue'
		// 			value={rowdata.GroupValueId}
		// 			fullWidth={true}
		// 			margin='normal' />
		// 	</DialogContentText>
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
						setDialogTitle(editOptions.title)
						setRowValue(rowdata)
						setDialogSaveButtonText(editOptions.saveButtonText)

						setDialogCancelButtonText(editOptions.cancelButtonText)
						setDialogCancelAction(() => {
							return () => {
								setIsLoading(false)
								editOptions.cancelAction()
							}
						})
						setDialogOpen(true)
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
		console.log('list :>> ', list)
		setColumns(list.columns)
		setData(list.items)

		handleDirty(false)

		if (!preLoad) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (preLoad) {
			setIsLoading(true)
		}
		return () => {}
	}, [preLoad])

	useEffect(() => {
		if (isDirty) {
			populateTable()
		}

		return () => {}
	}, [isDirty])

	useEffect(() => {
		console.log('columns useEffect', columns)
		if (rowValue) {
			setDialogContent(
				<DialogContentText>
					<div />
					{editOptions.content}
					{columns.map((column, index) => {
						console.log('column :>> ', column)
						console.log('rowValue :>> ', rowValue)
						switch (column.fieldTypeKind) {
							case 2:
								return (
									<TextField
										id={column.title}
										label={column.title}
										key={column.title}
										type='text'
										value={rowValue[column.title]}
										fullWidth={true}
										margin='normal'
									/>
								)
								break
							case 3:
								return <RTEditor key={column.title} />
								break
							case 8:
								return (
									<FormControlLabel
										key={column.title}
										value={'value'}
										label={column.title}
										labelPlacement={'left'}
										control={
											<Checkbox
												id={column.title}
												key={column.title}
												label={column.title}
												value={rowValue[column.title]}
											/>
										}
									/>
								)
								break
							case 9:
								return (
									<TextField
										id={column.title}
										key={column.title}
										label={column.title}
										type='number'
										multiline={true}
										value={rowValue[column.title]}
										fullWidth={true}
										margin='normal'
									/>
								)
								break
							case 20:
								return (
									<div key={column.title}>
										group: {column.title}
									</div>
								)
								break
							default:
								return <div>{column.title}</div>
						}
					})}
					{/* <TextField
					id='TextValue'
					label='TextValue'
					value={'rowdata.TextValue'}
					fullWidth={true}
					autoFocus={true}
					margin='normal'
				/>
				<MUIRichTextEditor
					label='MultiTextValue'
					value={'rowdata.MultiTextValue'}
					fullWidth={true}
					multiline={true}
					margin='normal'
				/>
				<TextField
					id='NumberValue'
					label='NumberValue'
					value={'rowdata.NumberValue'}
					fullWidth={true}
					margin='normal'
				/>
				<TextField
					id='YesNoValue'
					label='YesNoValue'
					value={'rowdata.YesNoValue'}
					fullWidth={true}
					margin='normal'
				/>
				<TextField
					id='GroupValueId'
					label='GroupValue'
					value={'rowdata.GroupValueId'}
					fullWidth={true}
					margin='normal'
				/> */}
				</DialogContentText>
			)
		}
		return () => {}
	}, [columns, rowValue])

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
