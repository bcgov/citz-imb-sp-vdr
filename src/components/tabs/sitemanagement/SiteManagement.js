import React, { Fragment, useState } from 'react'
import { SPList } from '../../sharepoint/SPList'
import { UsersDialog } from './UsersDialog'
import { LibraryDialog } from './LibraryDialog'
import { QuestionDialog } from './QuestionDialog'

export const SiteManagement = () => {
	const [usersDialogOpen, setUsersDialogOpen] = useState(false)
	const [groupId, setGroupId] = useState()
	const [proponentName, setProponentName] = useState("")
	const [libraryDialogOpen, setLibraryDialogOpen] = useState(false)
	const [questionDialogOpen, setQuestionDialogOpen] = useState(false)
	const [libraryName, setLibraryName] = useState("")
	const [questionListName, setQuestionListName] = useState("")

	const handleUsersDialogClose = () => setUsersDialogOpen(false)
	const handleLibraryDialogClose = () => setLibraryDialogOpen(false)
	const handleQuestionDialogClose = () => setQuestionDialogOpen(false)

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1
	}

	const customActions = [
		{
			//manage proponent users
			icon: 'People',
			tooltip: 'Manage User Accounts',
			onClick: (event, rowdata) => {
				setUsersDialogOpen(true)
				setGroupId(rowdata.GroupId)
				setProponentName(rowdata.Title)
			}
		},
		{
			//manage proponent library
			icon: 'Library',
			tooltip: 'Open Proponent Library',
			onClick: (event, rowdata) => {
				setLibraryName(rowdata.UUID)
				setProponentName(rowdata.Title)
				setLibraryDialogOpen(true)
			}
		},
		{
			//manage proponent questions
			icon: 'Question',
			tooltip: 'Open Proponent Questions',
			onClick: (event, rowdata) => {
				setQuestionListName(`${rowdata.UUID}_Questions`)
				setProponentName(rowdata.Title)
				setQuestionDialogOpen(true)
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
			<LibraryDialog
				open={libraryDialogOpen}
				libraryName={libraryName}
				proponentName={proponentName}
				handleClose={handleLibraryDialogClose}
			/>
			<QuestionDialog
				open={questionDialogOpen}
				listName={questionListName}
				proponentName={proponentName}
				handleClose={handleQuestionDialogClose}
			/>
		</Fragment>
	)
}
