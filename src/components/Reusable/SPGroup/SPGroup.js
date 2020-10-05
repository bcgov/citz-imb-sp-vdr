import React, { useState, useEffect, Fragment, forwardRef } from 'react'
import MaterialTable from 'material-table'
import {
	GetGroup,
	GetGroupMembers,
	AddUsersToGroup,
	RemoveUsersFromGroup,
} from 'citz-imb-sp-utilities'
import { Paper } from '@material-ui/core'
import { SPDialog, PeoplePicker, icons } from 'Components'

export const SPGroup = ({
	groupId,
	addUser = true,
	addUserCallback = () => {
		console.warn('default addUserCallback')
	},
	removeUserCallback = () => {
		console.warn('default removeUserCallback')
	},
	removeUser = true,
	editGroup = true,
	customActions,
	options,
}) => {
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
	//const [users, setUsers] = useState([])
	let users = []

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
	]
	const handleAddUserCancel = () => setDialogParameters({ open: false })

	const handleAddUserSave = () => {
		setIsLoading(true)
		AddUsersToGroup({ groupId: groupId, loginName: users }).then(
			(response) => {
				refreshData()
				addUserCallback(response)
			}
		)
		setDialogParameters({ open: false })
	}

	const handleUsers = (newUsers) => {
		users = newUsers
	}

	const refreshData = () => {
		GetGroupMembers({ groupId: groupId }).then((response) => {
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
											getUserInfo={handleUsers}
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
