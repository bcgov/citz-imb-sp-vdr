import React, { useState, useEffect, Fragment, forwardRef } from 'react'
import MaterialTable from 'material-table'
import {
	GetGroup,
	GetGroupMembers,
	AddUsersToGroup,
	RemoveUsersFromGroup,
} from 'citz-imb-sp-utilities'
import { Paper } from '@material-ui/core'
import { SPDialog } from './SP'

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
import { PeoplePicker } from './PeoplePicker'

export const SPGroup = ({
	groupId,
	addUser = true,
	addUserCallback = () => {
		console.log('default addUserCallback')
	},
	removeUserCallback = () => {
		console.log('default removeUserCallback')
	},
	removeUser = true,
	editGroup = true,
	customActions,
	options,
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
		)),
	}
	const styles = {
		paper: {
			height: '300px',
			width: 'auto',
		},
	}
	const [data, setData] = useState([])
	const [groupTitle, setGroupTitle] = useState()
	const [actions, setActions] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	let userInfo = []

	const [dialogParameters, setDialogParameters] = useState({ open: false })

	const columns = [
		{
			field: 'Title',
			title: 'Title',
		},
		{
			field: 'Email',
			title: 'Email',
		},
		{
			field: 'LoginName',
			title: 'LoginName',
		},
	]
	const handleAddUserCancel = () => setDialogParameters({ open: false })

	const handleAddUserSave = () => {
		setIsLoading(true)
		let loginNames = userInfo.map((user) => user.account)
		AddUsersToGroup({ groupId: groupId, loginName: loginNames }).then(
			(response) => {
				refreshData()
				addUserCallback(response)
			}
		)
		setDialogParameters({ open: false })

	}

	const refreshData = () => {
		GetGroupMembers({ groupId: groupId }).then((response) => {
			console.log('response :>> ', response);
			setData(response)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		GetGroup({ groupId: groupId }).then((response) => {
			setGroupTitle(response.Title)

			if (addUser) {
				setActions((prevActions) => {
					prevActions.push({
						icon: icons.Add,
						tooltip: 'Add User',
						isFreeAction: true,
						onClick: (event, rowdata) => {
							setDialogParameters({
								open: true,
								title: `Add user to ${response.Title}`,
								content: (
									<Paper style={styles.paper}>
										<PeoplePicker
											schema={{
												PrincipalAccountType:
													'User,DL,SecGroup,SPGroup',
												SearchPrincipalSource: 15,
												ResolvePrincipalSource: 15,
												AllowMultipleValues: true,
												MaximumEntitySuggestions: 50,
												Width: '400px',
											}}
											elementName={`${response.Title}_addUserPeoplePicker`}
											getUserInfo={(users) => {
												userInfo = users
											}}
										/>
									</Paper>
								),

								saveButtonAction: handleAddUserSave,

								cancelButtonAction: handleAddUserCancel,
							})
						},
					})

					return prevActions
				})
			}

			if (removeUser) {
				setActions((prevActions) => {
					prevActions.push({
						icon: icons.Delete,
						tooltip: 'Remove User',
						onClick: (event, rowdata) => {
							setIsLoading(true)
							RemoveUsersFromGroup({
								groupId: groupId,
								userId: rowdata.Id,
							}).then((response) => {
								removeUserCallback(rowdata)
								refreshData()
							})
						},
					})

					return prevActions
				})
			}

			if (editGroup) {
				setActions((prevActions) => {
					prevActions.push({
						icon: icons.Edit,
						tooltip: 'Edit Group',
						isFreeAction: true,
						onClick: (event, rowdata) => {
							//TODO: edit group actions
						},
					})

					return prevActions
				})
			}

			if (customActions) {
				customActions.map((action) => {
					action.icon = icons[action.icon]

					return setActions((prevActions) => {
						prevActions.push(action)
						return prevActions
					})
				})
			}
			refreshData()
		})

		return () => {}
	}, [])

	return (
		<Fragment>
			<MaterialTable
				columns={columns}
				data={data}
				title={groupTitle}
				options={options}
				actions={actions}
				isLoading={isLoading}
			/>
			<SPDialog {...dialogParameters} />
		</Fragment>
	)
}
