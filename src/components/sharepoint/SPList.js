import React, { useState, useEffect, Fragment, forwardRef } from 'react'
import MaterialTable from 'material-table'
import { SPDialog } from './SP'
import {
	GetList
} from 'citz-imb-sp-utilities'

import Add from '@material-ui/icons/Add'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

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
	handleDirty = () => {},
}) => {
	const icons = {
		Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
		AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => (
			<DeleteOutline {...props} ref={ref} />
		)),
		DetailPanel: forwardRef((props, ref) => (
			<ChevronRight {...props} ref={ref} />
		)),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => (
			<FirstPage {...props} ref={ref} />
		)),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => (
			<ChevronRight {...props} ref={ref} />
		)),
		PreviousPage: forwardRef((props, ref) => (
			<ChevronLeft {...props} ref={ref} />
		)),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => (
			<ArrowDownward {...props} ref={ref} />
		)),
		ThirdStateCheck: forwardRef((props, ref) => (
			<Remove {...props} ref={ref} />
		)),
		ViewColumn: forwardRef((props, ref) => (
			<ViewColumn {...props} ref={ref} />
		)),
	}
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const [title, setTitle] = useState('')
	const [actions, setActions] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [dialogTitle, setDialogTitle] = useState()
	const [dialogContent, setDialogContent] = useState()
	const [dialogSaveButtonText, setDialogSaveButtonText] = useState()
	const [dialogSaveAction, setDialogSaveAction] = useState()
	const [dialogCancelButtonText, setDialogCancelButtonText] = useState()
	const [dialogCancelAction, setDialogCancelAction] = useState()

	const saveButtonHandler = (results) => {
		dialogSaveAction()
		setDialogOpen(false)
	}

	const cancelButtonHandler = (results) => {
		dialogCancelAction()
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
						setDialogSaveAction(() => {
							return addOptions.saveAction
						})
						setDialogCancelButtonText(addOptions.cancelButtonText)
						setDialogCancelAction(() => {
							return addOptions.cancelAction
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
			GetList({
				listName: listName,
				expand:
					'DefaultView,DefaultView/ViewFields,Fields,Items,Items/File',
			}).then((response) => {
				//Title
				setTitle(response.Title)

				//List Columns
				let listColumns = {}
				for (let i = 0; i < response.Fields.results.length; i++) {
					listColumns[response.Fields.results[i].InternalName] =
						response.Fields.results[i].Title
				}

				//Table Columns
				if (response.BaseTemplate === 101) {
					setColumns(
						response.DefaultView.ViewFields.Items.results.map(
							(field) => {
								let fieldObject = {
									title: listColumns[field],
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
								return {
									title: listColumns[field],
									field: field,
								}
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
