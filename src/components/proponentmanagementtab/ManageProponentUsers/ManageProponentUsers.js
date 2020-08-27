import React, { useState } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import {
	SPList,
	LogAction,
	SPDialog,
	SPGroup,
	ToggleProponent,
	AddProponent,
	SendConfirmationEmail,
	tableOptions,
} from 'Components'

export const ManageProponentUsers = (rowData) => {
	const [dialogParameters, setDialogParameters] = useState({ open: false })

	if (rowData.Active) {
		return {
			//manage proponent users
			icon: () => <PeopleIcon color={'primary'} />,
			tooltip: 'Manage User Accounts',
			onClick: (event, rowdata) => {
				const addUserCallback = (response) => {
					let users = []
					for (let i = 0; i < response.length; i++) {
						users.push(response[i].Title)
					}
					LogAction(`added ${users.join('; ')} to ${rowdata.Title}`)
					SendConfirmationEmail(response, rowdata)
				}
				const removeUserCallback = (response) => {
					LogAction(`removed ${response.Title} from ${rowdata.Title}`)
				}
				setDialogParameters({
				    open: true,
				    title: `${rowdata.Title} - ${rowdata.UUID}`,
				    content: (
				        <SPGroup
				            groupId={rowdata.GroupId}
				            addUser={true}
				            addUserCallback={addUserCallback}
				            removeUserCallback={removeUserCallback}
				            removeUser={true}
				            editGroup={false}
				            options={tableOptions}
				        />
				    ),
				    showSave: false,
				    cancelButtonText: 'Close',
				    cancelButtonAction: () => {
				        setDialogParameters({ open: false })
				    },
				})
			},
		}
	} else {
		return {
			icon: PeopleIcon,
			disabled: true,
		}
	}
}
