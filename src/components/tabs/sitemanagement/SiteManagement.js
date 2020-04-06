import React, { Fragment, useState } from 'react'
import { SPList } from '../../sharepoint/SPList'
import { UsersDialog } from './UsersDialog'

export const SiteManagement = () => {
	const [usersDialogOpen, setUsersDialogOpen] = useState(false)
	const [groupId, setGroupId] = useState()
	const [proponentName, setProponentName] = useState("")
	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1
	}
	const handleUsersDialogClose = () => setUsersDialogOpen(false)

	const customActions = [
		{
			//manage proponent users
			icon: 'People',
			tooltip: 'Manage User Accounts',
			onClick: (event, rowdata) => {
				setUsersDialogOpen(true)
				setGroupId(rowdata.GroupId)
				setProponentName(rowdata.Title)
					//handleClose: usersHandleClose
			}
		},
		{
			//manage proponent library
			icon: 'Library',
			tooltip: 'Open Proponent Library',
			onClick: (event, rowdata) => {
				// setCurrentProponent(rowdata.UUID)
				// setProponentLibraryDialog(true)
			}
		},
		{
			//manage proponent questions
			icon: 'Question',
			tooltip: 'Open Proponent Questions',
			onClick: (event, rowdata) => {
				// setCurrentProponent(rowdata.UUID)
				// setProponentQuestionDialog(true)
			}
		}
	]

	return (
		<Fragment>
			<SPList
				listName='Proponents'
				addItem={true}
				deleteItem={false}
				editItem={false}
				changeItemPermission={false}
				customActions={customActions}
				options={options}
			/>
			<UsersDialog
				open={usersDialogOpen}
				groupId={groupId}
				proponentName={proponentName}
				handleClose={handleUsersDialogClose}
			/>
		</Fragment>
	)
}
