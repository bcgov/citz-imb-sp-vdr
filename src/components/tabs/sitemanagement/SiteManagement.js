import React, { Fragment, useState } from 'react'
import { SPList } from '../../sharepoint/SPList'
import { UsersDialog } from './UsersDialog'
import { LibraryDialog } from './LibraryDialog'
import { QuestionDialog } from './QuestionDialog'
import { AddProponentDialog } from './AddProponentDialog'
import { ToggleProponentDialog } from './ToggleProponentDialog'

export const SiteManagement = () => {
	const proponentListName = 'Proponents'

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1,
	}

	const [usersDialogOpen, setUsersDialogOpen] = useState(false)
	const [libraryDialogOpen, setLibraryDialogOpen] = useState(false)
	const [questionDialogOpen, setQuestionDialogOpen] = useState(false)
	const [addProponentDialogOpen, setAddProponentDialogOpen] = useState(false)
	const [toggleProponentDialogOpen, setToggleProponentDialogOpen] = useState(
		false
	)
	const [currentProponentToggle, setCurrentProponentToggle] = useState({})

	const [groupId, setGroupId] = useState()
	const [proponentName, setProponentName] = useState('')
	const [libraryName, setLibraryName] = useState('')
	const [questionListName, setQuestionListName] = useState('')
	const [isDirty, setIsDirty] = useState(true)

	const handleUsersDialogClose = () => setUsersDialogOpen(false)
	const handleLibraryDialogClose = () => setLibraryDialogOpen(false)
	const handleQuestionDialogClose = () => setQuestionDialogOpen(false)

	const handleToggleProponentDialogClose = () => {
		setToggleProponentDialogOpen(false)
		setIsDirty(true)
	}

	const handleAddProponentDialogClose = () => {
		setAddProponentDialogOpen(false)
		setIsDirty(true)
	}

	const customActions = [
		{
			icon: 'Add',
			tooltip: 'Add New Proponent',
			isFreeAction: true,
			onClick: (event, rowdata) => {
				setAddProponentDialogOpen(true)
			},
		},
		{
			//manage proponent library
			icon: 'Library',
			tooltip: 'Open Proponent Library',
			onClick: (event, rowdata) => {
				setLibraryName(rowdata.UUID)
				setProponentName(rowdata.Title)
				setLibraryDialogOpen(true)
			},
		},
		{
			//manage proponent questions
			icon: 'Question',
			tooltip: 'Open Proponent Questions',
			onClick: (event, rowdata) => {
				setQuestionListName(`${rowdata.UUID}_Questions`)
				setProponentName(rowdata.Title)
				setQuestionDialogOpen(true)
			},
		},
		(rowData) => ({
			//manage proponent users
			icon: 'People',
			tooltip: 'Manage User Accounts',
			disabled: !rowData.Active,
			onClick: (event, rowdata) => {
				setUsersDialogOpen(true)
				setGroupId(rowdata.GroupId)
				setProponentName(rowdata.Title)
			},
		}),
		(rowData) => ({
			//Activate / inactivate proponent
			icon: 'LockIcon',
			tooltip: 'Toggle Proponent Active / Inactive',
			onClick: (event, rowdata) => {
				setCurrentProponentToggle(rowdata)
				setToggleProponentDialogOpen(true)
			},
		}),
	]

	return (
		<Fragment>
			<SPList
				listName={proponentListName}
				addItem={false}
				deleteItem={false}
				editItem={false}
				changeItemPermission={false}
				customActions={customActions}
				options={options}
				isDirty={isDirty}
				handleDirty={setIsDirty}
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
			<AddProponentDialog
				open={addProponentDialogOpen}
				listName={proponentListName}
				handleClose={handleAddProponentDialogClose}
			/>
			<ToggleProponentDialog
				open={toggleProponentDialogOpen}
				handleClose={handleToggleProponentDialogClose}
				listName={proponentListName}
				proponent={currentProponentToggle}
			/>
		</Fragment>
	)
}
