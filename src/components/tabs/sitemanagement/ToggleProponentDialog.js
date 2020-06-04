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
	AddPermissionsToSite,
	AddPermissionsToList,
	ChangeGroupOwner,
	CreateGroup,
	DeleteGroup,
	GetAssociatedGroups,
	GetRoleDefinitions,
	UpdateListItem,
} from 'citz-imb-sp-utilities'

export const ToggleProponentDialog = ({
	open,
	handleClose,
	listName,
	proponent,
}) => {
	console.log(`proponent`, proponent)
	const handleSave = () => {
		if (proponent.Active) {
			//delete group
			DeleteGroup({ groupId: proponent.GroupId })
			//update proponent list
			UpdateListItem({
				listName: listName,
				items: { Id: proponent.Id, Active: false, GroupId: 0 },
			})
		} else {
			//create group
			//apply permissions
			//update proponent list
			let group, assocGroups, roles, currentUser

			Promise.all([
				CreateGroup({ groupName: proponent.UUID }),
				GetAssociatedGroups(),
				GetRoleDefinitions({}),
				//GetCurrentUser(),
			]).then((response1) => {
				;[group, assocGroups, roles] = response1
				Promise.all([
					ChangeGroupOwner({
						groupId: group.Id,
						ownerGroupId: assocGroups.AssociatedOwnerGroup.Id,
					}), //proponent group - need results of CreateGroup and GetAssociatedGroups
					UpdateListItem({
						listName: listName,
						items: {
							Id: proponent.Id,
							Active: true,
							GroupId: group.Id,
						},
					}),
					//update proponents list - need results of CreateGroup
					AddPermissionsToSite({
						principalId: group.Id,
						roleDefId: roles['Read'].Id,
					}), //add proponent group to see site - need results of CreateGroup
					AddPermissionsToList({
						listName: proponent.UUID,
						principalId: group.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent library - Proponent - need results of CreateList and CreateGroup
					AddPermissionsToList({
						listName: `${proponent.UUID}_Questions`,
						principalId: group.Id,
						roleDefId: roles['Contribute'].Id,
					}), //proponent question list - Proponent - need results of CreateList and CreateGroup
				]).then((response2) => {
					handleClose()
				})
			})
		}
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle id='form-dialog-title'>
				Set {proponent.Title} {proponent.Active ? 'Inactive' : 'Active'}{' '}
				?
			</DialogTitle>
			<DialogContent>
				{proponent.Active
					? 'Proponent Group will be deleted; member users will no-longer be able to access the site.'
					: 'A new group will be created for the proponent. You will need to manually add users.'}
			</DialogContent>
			<DialogActions>
				{proponent.Active ? (
					<Button onClick={handleSave} color='primary'>
						Set Inactive
					</Button>
				) : (
					<Button onClick={handleSave} color='primary'>
						Set Active
					</Button>
				)}
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
