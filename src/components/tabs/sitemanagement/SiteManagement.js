import React, { Fragment, useState } from 'react'
import { SPList } from 'citz-imb-sp-utilities'
// import { UsersDialog } from './UsersDialog'
// import { LibraryDialog } from './LibraryDialog'
// import { QuestionDialog } from './QuestionDialog'
// import { AddProponentDialog } from './AddProponentDialog'

export const SiteManagement = () => {
	const [usersDialogOpen, setUsersDialogOpen] = useState(false)
	const [libraryDialogOpen, setLibraryDialogOpen] = useState(false)
	const [questionDialogOpen, setQuestionDialogOpen] = useState(false)
	const [addProponentDialogOpen, setAddProponentDialogOpen] = useState(false)

	const [groupId, setGroupId] = useState()
	const [proponentName, setProponentName] = useState('')
	const [libraryName, setLibraryName] = useState('')
	const [questionListName, setQuestionListName] = useState('')

	const handleUsersDialogClose = () => setUsersDialogOpen(false)
	const handleLibraryDialogClose = () => setLibraryDialogOpen(false)
	const handleQuestionDialogClose = () => setQuestionDialogOpen(false)
	const handleAddProponentDialogClose = () => setAddProponentDialogOpen(false)
	const handleAddProponentDialogSave = () => setAddProponentDialogOpen(false)

	const proponentListName = 'Proponents'

	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1,
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
			//manage proponent users
			icon: 'People',
			tooltip: 'Manage User Accounts',
			onClick: (event, rowdata) => {
				setUsersDialogOpen(true)
				setGroupId(rowdata.GroupId)
				setProponentName(rowdata.Title)
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
	]

	return (
		<Fragment>
			<SPList
				listName={'Proponents'}
				// addItem={false}
				// deleteItem={false}
				// editItem={false}
				// changeItemPermission={false}
				// customActions={customActions}
				options={options}
			/>
			{/* <UsersDialog
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
				saveCallback={handleAddProponentDialogSave}
			/> */}
		</Fragment>
	)
}
