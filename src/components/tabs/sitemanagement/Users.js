import React, { forwardRef, useState, useEffect, useContext, Fragment } from "react"
import { Dialog, DialogTitle, IconButton, DialogContent } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import MaterialTable from "material-table"
import { AddUsersToGroup } from 'citz-imb-sp-utilities'

import { WebFullUrl } from "../../../App"
import makeUUID from "../../utilities/makeUUID.js"

import Add from "@material-ui/icons/Add"
import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import NotInterestedIcon from "@material-ui/icons/NotInterested"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import AddUser from "./AddUser"

const tableIcons = {
	Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
	AddBox: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	NotInterested: forwardRef((props, ref) => <NotInterestedIcon {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

export default function Users({ open, group, proponentName, handleClose }) {
	const webFullUrl = useContext(WebFullUrl)

	const [addUserOpen, setAddUserOpen] = useState(false)
	const [title, setTitle] = useState("")
	const [options, setOptions] = useState({
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		toolbar: true
	})
	const [data, setData] = useState([])
	const [icons, setIcons] = useState(tableIcons)
	const [actions, setActions] = useState([
		{
			icon: tableIcons.Add,
			tooltip: "Add a User",
			isFreeAction: true,
			onClick: () => {
				addUser()
			}
		},
		{
			icon: tableIcons.Delete,
			tooltip: "Remove User",
			onClick: (event, rowdata) => {
				removeUser(rowdata)
			}
		}
	])
	const [columns, setColumns] = useState([
		{
			title: "User",
			field: "Title"
		},
		{
			title: "Email",
			field: "Email"
		}
	])

	const config = {
		headers: {
			"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
			"content-type": "application/json;odata=verbose"
		}
	}

	const addUser = () => {
		setAddUserOpen(true)
	}

	const addUsersToGroup = userInfo => {
		console.log("userInfo", userInfo)
		const users = userInfo.map(user => {
			return user.account
		})
		AddUsersToGroup({ url: webFullUrl, groupId: group, loginName: users }).then(data => {
			console.log("data", data)
			refreshTable()
			setAddUserOpen(false)
		})
	}

	const removeUser = rowdata => {

			.post(
				`${webFullUrl}/_api/web/SiteGroups(${group})/users/removeById(${rowdata.Id})`,
				{},
				{
					headers: {
						"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
						"content-type": "application/json;odata=verbose",
						Accept: "application/json;odata=verbose"
					}
				}
			)
			.then(response => {
				refreshTable()
			})
			.catch(error => {
				console.groupCollapsed("Error Details")
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
					console.error("Error", error.message)
				}
				console.error(error.config)
				console.groupEnd()
			})
	}

	const refreshTable = () => {
		if (open) {
			
				.get(`${webFullUrl}/_api/web/SiteGroups(${group})/users`)
				.then(response => {
					setData(response.data.value)
					setTitle(proponentName)
				})
				.catch(error => {
					console.groupCollapsed("Error Details")
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
						console.error("Error", error.message)
					}
					console.error(error.config)
					console.groupEnd()
				})
		}
	}

	useEffect(() => {
		refreshTable()

		return () => {
			setData([])
		}
	}, [open])

	return (
		<Fragment>
			<Dialog open={open} maxWidth='md' onClose={handleClose}>
				<DialogTitle id='form-dialog-title'>
					User accounts for {proponentName}
					<IconButton aria-label='close' onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<MaterialTable
						options={options}
						actions={actions}
						columns={columns}
						data={data}
						icons={icons}
						title={title}
					/>
				</DialogContent>
			</Dialog>
			<AddUser
				open={addUserOpen}
				proponentName={proponentName}
				getUserInfo={addUsersToGroup}
				handleClose={() => {
					setAddUserOpen(false)
				}}
			/>
		</Fragment>
	)
}
