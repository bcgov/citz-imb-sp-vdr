import React, { useState, useEffect, Fragment } from 'react'
import MaterialTable from 'material-table'
import { SPDialog } from './SP'
import { GetList } from 'citz-imb-sp-utilities'
import { icons } from '../utilities/icons'
import Moment from 'react-moment'

export const SPList = ({
	listName,
	addItem = true,
	addOptions = {
		title: 'Add Item',
		content: 'Content',
		saveButtonText: 'Save',
		saveAction: () => {
			console.log('I am saved')
		},
		cancelButtonText: 'Cancel',
		cancelAction: () => {
			console.log('I am lost')
		},
	},
	deleteItem = true,
	editItem = true,
	changeItemPermission = true,
	customActions,
	options,
	isDirty = true,
	handleDirty = (dirty) => {
		console.log(`handleDirty Default has been passed '${dirty}'`)
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

	useEffect(() => {
		if (isDirty) {
			setIsLoading(true)
			GetList({
				listName: listName,
				expand:
					'DefaultView,DefaultView/ViewFields,Fields,Items,Items/File',
			}).then((response) => {
				//Title
				if (tableTitle) {
					setTitle(tableTitle)
				} else {
					setTitle(response.Title)
				}

				//List Columns
				let listColumns = {}
				for (let i = 0; i < response.Fields.results.length; i++) {
					listColumns[response.Fields.results[i].InternalName] = {
						Title: response.Fields.results[i].Title,
						FieldTypeKind: response.Fields.results[i].FieldTypeKind,
					}
				}

				//Table Columns
				if (response.BaseTemplate === 101) {
					setColumns(
						response.DefaultView.ViewFields.Items.results.map(
							(field) => {
								let fieldObject = {
									title: listColumns[field].Title,
									field: field,
								}

								if (field === 'LinkFilenameNoMenu') {
									fieldObject.render = (rowdata) => {
										return (
											<a
												href={
													rowdata.File
														.ServerRelativeUrl
												}>
												{rowdata.File.Name}
											</a>
										)
									}
								}
								if (field === 'LinkFilename') {
									fieldObject.render = (rowdata) => {
										return (
											<a
												href={
													rowdata.File
														.ServerRelativeUrl
												}>
												{rowdata.File.Name} - edit
											</a>
										)
										//TODO: make edit dropdown
									}
								}

								return fieldObject
							}
						)
					)
				} else {
					setColumns(
						response.DefaultView.ViewFields.Items.results.map(
							(field) => {
								let fieldObject = {
									title: listColumns[field].Title,
									field: field,
								}

								if (listColumns[field].FieldTypeKind === 4) { //datetime
									fieldObject.render = (rowdata) => {
										return (
											<Moment
												fromNowDuring={3600000}
												format={
													'dddd, MMMM Do, YYYY @ h:mm a'
												}>
												{rowdata[field]}
											</Moment>
										)
									}
								} else if (
									listColumns[field].FieldTypeKind === 3 //multilinetext
								) {
									fieldObject.render = (rowdata) => {
										return (
											<div
												dangerouslySetInnerHTML={{
													__html: rowdata[field],
												}}
											/>
										)
									}
								}

								if (field === 'LinkTitle') {
									fieldObject.render = (rowdata) => {
										return (
											<a
												href={
													rowdata.File
														.ServerRelativeUrl
												}>
												{rowdata.Title}
											</a>
										)
									}
								}
								return fieldObject
							}
						)
					)
				}

				//Table Data
				setData(response.Items.results)
				handleDirty(false)
				setIsLoading(false)
			})
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
