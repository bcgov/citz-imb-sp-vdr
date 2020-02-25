import React, { forwardRef, useState, useEffect, useContext } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	IconButton
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { PageContext } from '../../../App'
import axios from 'axios'

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
import CloseIcon from '@material-ui/icons/Close'
/**
 * Present the users for a specific proponent in a dialog
 */
const tableIcons = {
	Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
	AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
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
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

export default function Users(props) {
	const pageContext = useContext(PageContext)

	const config = {
		headers: {
			'X-RequestDigest': document.getElementById('__REQUESTDIGEST').value,
			'content-type': 'application/json;odata=verbose'
		}
	}

	const [table, setTable] = useState({
		title: 'User Accounts for ' + props.proponentName,
		options: {
			search: false,
			sorting: false,
			paging: false,
			pageSize: 20,
			draggable: false,
			toolbar: true
		},
		icons: tableIcons,
		data: [],
		actions: [
			{
				icon: tableIcons.Add,
				tooltip: 'Add a User',
				isFreeAction: true,
				onClick: (event, rowdata) => {
					addUser()
				}
			},
			{
				icon: tableIcons.Delete,
				tooltip: 'Remove User',
				onClick: (event, rowdata) => {
					deleteUser(rowdata)
				}
			}
		],
		columns: [
			{
				title: 'User',
				field: 'Title'
			},
			{
				title: 'Email',
				field: 'Email'
			}
		]
	})

	const addUser = () => {
		console.log(`addUser`)
	}

	const deleteUser = rowdata => {
		console.log(`deleteUser`, rowdata)
		console.log(`props`, props)
		axios
			.post(
				`${pageContext.webAbsoluteUrl}/_api/web/SiteGroups(${props.group})/removeById(${rowdata.Id})`,
				{},
				{
					headers: {
						...config.headers,
						Accept: 'application/json:odata=verbose'
					}
				}
			)
			.then(response => {
				console.log(
					`/SiteGroups(${props.group}/removeById(${rowdata.Id})`,
					response.data
				)
			})
			.catch(error => {
				console.groupCollapsed('Error Details')
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data)
					console.error(error.response.status)
					console.error(error.response.headers)
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.error(error.request)
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error('Error', error.message)
				}
				console.error(error.config)
				console.groupEnd()
			})
	}

	const refreshTable = () => {
		axios
			.get(
				`${pageContext.webAbsoluteUrl}/_api/web/SiteGroups(${props.group})/users`
			)
			.then(response => {
				console.log(`/SiteGroups(${props.group})/users`, response.data)
				setTable({ ...table, data: response.data.value })
			})
			.catch(error => {
				console.groupCollapsed('Error Details')
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data)
					console.error(error.response.status)
					console.error(error.response.headers)
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.error(error.request)
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error('Error', error.message)
				}
				console.error(error.config)
				console.groupEnd()
			})
	}

	useEffect(() => {
		refreshTable()
		return () => {
			setTable({ ...table, data: [] })
		}
	}, [props.open])

	return (
		<Dialog open={props.open} onClose={props.handleClose} maxWidth='md'>
			<DialogTitle id='form-dialog-title'>
				User accounts for {props.proponentName}
				<IconButton aria-label='close' onClick={props.handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<MaterialTable {...table} />
			</DialogContent>
		</Dialog>
	)
}
