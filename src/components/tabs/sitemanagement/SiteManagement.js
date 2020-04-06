import React, { useEffect, useState } from 'react'
import { SPList } from '../../utilities/SPList'

export const SiteManagement = () => {
	const options = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1
	}
	const customActions = [
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
			addItem={true}
			deleteItem={false}
			editItem={true}
			changeItemPermission={true}
			customActions={customActions}
			options={options}
		/>
	)
}
