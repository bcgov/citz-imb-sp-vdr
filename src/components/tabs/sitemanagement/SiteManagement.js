import React, { useEffect, useState } from 'react'
import { SPList } from '../../utilities/SPList'

export const SiteManagement = () => {
	const actions = [
		// {
		// 	//add a proponent
		// 	icon: icons.Add,
		// 	tooltip: 'Add a Proponent',
		// 	isFreeAction: true,
		// 	onClick: (event, rowdata) => {
		// 		setProponentAddDialog(true)
		// 	}
		// },
		// {
		// 	//disable a proponent
		// 	icon: icons.NotInterested,
		// 	tooltip: 'Disable Proponent',
		// 	onClick: (event, rowdata) => {
		// 		setCurrentProponentName(rowdata.Title)
		// 		setCurrentProponent(rowdata.UUID)
		// 		setProponentDisableDialog(true)
		// 	}
		// },
		// {
		// 	//manage proponent users
		// 	icon: icons.People,
		// 	tooltip: 'Manage User Accounts',
		// 	onClick: (event, rowdata) => {
		// 		setUsers({
		// 			open: true,
		// 			group: rowdata.GroupId,
		// 			proponentName: rowdata.Title,
		// 			handleClose: usersHandleClose
		// 		})
		// 	}
		// },
		// {
		// 	//manage proponent library
		// 	icon: icons.Library,
		// 	tooltip: 'Open Proponent Library',
		// 	onClick: (event, rowdata) => {
		// 		setCurrentProponent(rowdata.UUID)
		// 		setProponentLibraryDialog(true)
		// 	}
		// },
		// {
		// 	//manage proponent questions
		// 	icon: icons.Question,
		// 	tooltip: 'Open Proponent Questions',
		// 	onClick: (event, rowdata) => {
		// 		setCurrentProponent(rowdata.UUID)
		// 		setProponentQuestionDialog(true)
		// 	}
		// }
	]

	return (
		<SPList
			listName='Proponents'
		/>
	)
}
