import {
	CreateGroup,
	GetRoleDefinitions,
	AddPermissionsToList,
	AddPermissionsToSite,
	GetAssociatedGroups,
	ChangeGroupOwner,
	UpdateListItem,
	DeleteGroup,
} from 'citz-imb-sp-utilities'

export const ToggleProponent = (proponentListName, rowdata, callBack) => {
	if (rowdata.Active) {
		//delete group
		DeleteGroup({ groupId: rowdata.GroupId })
		//update proponent list
		UpdateListItem({
			listName: proponentListName,
			items: { Id: rowdata.Id, Active: false, GroupId: 0 },
		}).then(() => {
			callBack()
		})
	} else {
		let group, assocGroups, roles, currentUser

		Promise.all([
			//create group
			CreateGroup({ groupName: rowdata.UUID }),
			GetAssociatedGroups(),
			GetRoleDefinitions({}),
			//GetCurrentUser(),
		]).then((response1) => {
			;[group, assocGroups, roles] = response1
			Promise.all([
				ChangeGroupOwner({
				    groupId: group.Id,
				    ownerGroupId: assocGroups.AssociatedOwnerGroup.Id,
				}),
				//update proponent list
				UpdateListItem({
					listName: proponentListName,
					items: {
						Id: rowdata.Id,
						Active: true,
						GroupId: group.Id,
					},
				}),
				//apply permissions
				AddPermissionsToSite({
					principalId: group.Id,
					roleDefId: roles['Read'].Id,
				}),
				AddPermissionsToList({
					listName: rowdata.UUID,
					principalId: group.Id,
					roleDefId: roles['Contribute'].Id,
				}),
				AddPermissionsToList({
					listName: `${rowdata.UUID}_Questions`,
					principalId: group.Id,
					roleDefId: roles['Contribute'].Id,
				}),
			]).then((response2) => {
				callBack()
			})
		})
	}
}
