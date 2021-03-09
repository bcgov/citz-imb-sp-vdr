import {
	// 	AddPermissionsToList,
	// 	AddPermissionsToSite,
	// 	BreakListPermissionsInheritance,
	ChangeGroupOwner,
	CreateGroup,
	// 	CreateList,
	// 	GetRoleDefinitions,
	GetAssociatedGroups,
	// 	GetListItems,
	// 	DeleteGroup,
	// 	RemovePermissionsFromList,
	// 	GetCurrentUser,
	// 	AddFieldToList,
	// 	GetListDefaultView,
	// 	RemoveListViewAllFields,
	// 	AddListViewField,
	// 	RemoveListViewField,
	// 	UpdateField,
	// 	CreateView,
	// 	GetGroupMembers,
} from 'citz-imb-sp-utilities'

export const createProponentGroup = async (UUID) => {
	const associatedGroups = await GetAssociatedGroups()
	const group = await CreateGroup({ groupName: UUID })

	try {
		ChangeGroupOwner({
			groupId: group.Id,
			ownerGroupId: associatedGroups.AssociatedOwnerGroup.Id,
		})
	} catch {
		console.warn('unable to change group owner')
	}

	return group.Id
}
