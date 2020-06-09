import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core'
import {
	CreateGroup,
	GetRoleDefinitions,
	AddPermissionsToList,
	CreateList,
	BreakListPermissionsInheritance,
	AddPermissionsToSite,
	GetAssociatedGroups,
	ChangeGroupOwner,
	AddItemsToList,
	GetCurrentUser,
} from 'citz-imb-sp-utilities'
import makeUUID from '../../utilities/makeUUID.js'

// let SP = window.SP
// let ExecuteOrDelayUntilScriptLoaded = window.ExecuteOrDelayUntilScriptLoaded
// toast.configure({
//     position: "bottom-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: false
// })

export const AddProponentDialog = ({
	open,
	listName,
	handleClose,
}) => {
	const [name, setName] = useState('')
	const uniqueId = makeUUID()

	const handleSave = () => {
		// validate
		if (!name) return
		let group, library, list, assocGroups, roles, currentUser

		Promise.all([
			CreateGroup({ groupName: uniqueId }),
			CreateList({ listName: uniqueId, BaseTemplate: 101 }), //create proponent library //TODO: why is list created and not library
			CreateList({ listName: `${uniqueId}_Questions` }), //create proponent question list
			GetAssociatedGroups(),
			GetRoleDefinitions({}),
			GetCurrentUser({}),
		]).then((response1) => {
			;[group, library, list, assocGroups, roles, currentUser] = response1
			Promise.all([
				// ChangeGroupOwner({
				// 	groupId: group.Id,
				// 	ownerGroupId: assocGroups.AssociatedOwnerGroup.Id,
				// }), //proponent group - need results of CreateGroup and GetAssociatedGroups
				AddItemsToList({
					listName: 'Proponents',
					items: {
						Title: name,
						UUID: uniqueId,
						GroupId: group.Id,
					},
				}), //add to proponents list - need results of CreateGroup
				AddPermissionsToSite({
					principalId: group.Id,
					roleDefId: roles['Read'].Id,
				}), //add proponent group to see site - need results of CreateGroup
				BreakListPermissionsInheritance({
					listGUID: library.Id,
					copy: false,
					clear: true,
				}), //proponent library - need results of CreateList
				BreakListPermissionsInheritance({
					listGUID: list.Id,
					copy: false,
					clear: true,
				}), //proponent question list - need results of CreateList
			]).then((response2) => {
				Promise.all([
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: assocGroups.AssociatedOwnerGroup.Id,
						roleDefId: roles['Full Control'].Id,
					}), //proponent library - Owner - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: assocGroups.AssociatedMemberGroup.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent library - Member - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: assocGroups.AssociatedVisitorGroup.Id,
						roleDefId: roles['Read'].Id,
					}), //proponent library - Visitor - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: library.Id,
						principalId: group.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent library - Proponent - need results of CreateList and CreateGroup

					AddPermissionsToList({
						listGUID: list.Id,
						principalId: assocGroups.AssociatedOwnerGroup.Id,
						roleDefId: roles['Full Control'].Id,
					}), //proponent question list - Owner - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: list.Id,
						principalId: assocGroups.AssociatedMemberGroup.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent question list - Member - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: list.Id,
						principalId: assocGroups.AssociatedVisitorGroup.Id,
						roleDefId: roles['Read'].Id,
					}), //proponent question list - Visitor - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listGUID: list.Id,
						principalId: group.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent question list - Proponent - need results of CreateList and CreateGroup
				]).then((response3) => {
					//TODO: remove current user permissions from lists
					console.log(`currentUser`, currentUser)
					handleClose()
				})
			})
		})
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle id='form-dialog-title'>
				Add a new Proponent
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='proponentName'
					label="Proponent's Name"
					type='text'
					fullWidth
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSave} color='primary'>
					Save
				</Button>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
