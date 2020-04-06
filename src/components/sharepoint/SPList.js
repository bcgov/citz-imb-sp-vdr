import React, { useState, useEffect, Fragment, forwardRef } from 'react'
import MaterialTable from 'material-table'
import { SPAddItem } from './SPAddItem'
import {
	GetList,
	GetListItems,
	GetLibraryItems,
	GetListDefaultView,
	GetListFields
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
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PeopleIcon from '@material-ui/icons/People'

export const SPList = ({
	listName,
	addItem = true,
	deleteItem = true,
	editItem = true,
	changeItemPermission = true,
	customActions,
	options
}) => {
	const icons = {
		People: forwardRef((props, ref) => <PeopleIcon {...props} ref={ref} />),
		Question: forwardRef((props, ref) => (
			<QuestionAnswerIcon {...props} ref={ref} />
		)),
		Library: forwardRef((props, ref) => (
			<LibraryBooksIcon {...props} ref={ref} />
		)),
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
		NotInterested: forwardRef((props, ref) => (
			<NotInterestedIcon {...props} ref={ref} />
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
		))
	}
	const [listTemplate, setListTemplate] = useState()
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const [listColumns, setListColumns] = useState({})
	const [title, setTitle] = useState('')
	const [actions, setActions] = useState([])
	const [addDialog, setAddDialog] = useState(false)

	const refreshData = () => {
		if (listTemplate === 101) {
			GetListItems({ listName: listName, expand: "File" }).then(response => {
				response.map(item => {
					item.LinkFilenameNoMenu = item.File.Name
					item.LinkFilename = item.File.Name
					item.FileLeafRef = item.File.Name
					item.Url = item.OData__dlc_DocIdUrl.Url
					return item
				})
				setData(response)
			})
		} else {
			GetListItems({ listName: listName }).then(response => {
				setData(response)
			})
		}
	}

	useEffect(() => {
		GetList({ listName: listName }).then(response => {
			setListTemplate(response.BaseTemplate)
			setTitle(response.Title)
		})

		GetListFields({ listName: listName }).then(response => {
			let obj = {}
			for (let i = 0; i < response.length; i++) {
				obj[response[i].InternalName] = response[i].Title
			}
			setListColumns(obj)
		})

		if (addItem) {
			setActions(prevActions => {
				prevActions.push({
					icon: icons.Add,
					tooltip: 'Add Item',
					isFreeAction: true,
					onClick: (event, rowdata) => {
						setAddDialog(true)
					}
				})

				return prevActions
			})
		}

		if (deleteItem) {
			setActions(prevActions => {
				prevActions.push({
					icon: icons.Delete,
					tooltip: 'Delete Item',
					onClick: (event, rowdata) => {
						//TODO: delete item actions
					}
				})

				return prevActions
			})
		}

		if (editItem) {
			setActions(prevActions => {
				prevActions.push({
					icon: icons.Edit,
					tooltip: 'Edit Item',
					onClick: (event, rowdata) => {
						//TODO: edit item actions
					}
				})

				return prevActions
			})
		}

		if (changeItemPermission) {
			setActions(prevActions => {
				prevActions.push({
					icon: icons.People,
					tooltip: 'Change Item Permissions',
					onClick: (event, rowdata) => {
						//TODO: change item permissions actions
					}
				})

				return prevActions
			})
		}

		if (customActions) {

			customActions.map((action, index) => {
				action.icon = icons[action.icon]

				return setActions(prevActions => {
					prevActions.push(action)
					return prevActions
				})
			})
		}

		return () => { }
	}, [])

	useEffect(() => {
		if (listTemplate === 101) {
			GetListDefaultView({ listName: listName }).then(response => {
				setColumns(
					response.ViewFields.Items.results.map(field => {
						console.log('field', field)
						let fieldObject = {
							title: listColumns[field],
							field: field
						}

						if (field === "LinkFilenameNoMenu") {
							fieldObject.render = rowdata => {
								return <a href={rowdata["Url"]}>{rowdata[field]}</a>
							}
						}
						if (field === "LinkFilename") {
							fieldObject.render = rowdata => {
								return <a href={rowdata["Url"]}>{rowdata[field]} - edit</a>
								//TODO: make edit dropdown
							}
						}

						return fieldObject
					})
				)
			})
		} else {
			GetListDefaultView({ listName: listName }).then(response => {
				setColumns(
					response.ViewFields.Items.results.map(field => {
						return {
							title: listColumns[field],
							field: field
						}
					})
				)
			})
		}
		return () => { }
	}, [listColumns, listTemplate])

	useEffect(() => {
		refreshData()
		return () => { }
	}, [listTemplate])

	return (
		<Fragment>
			<MaterialTable
				columns={columns}
				data={data}
				title={title}
				options={options}
				actions={actions}
			/>
			<SPAddItem open={addDialog} />
		</Fragment>
	)
}
