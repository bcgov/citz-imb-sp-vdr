import {
		AddPermissionsToList,
		AddPermissionsToSite,
	// BreakListPermissionsInheritance,
	// 	ChangeGroupOwner,
	// 	CreateGroup,
	// CreateList,
		GetRoleDefinitions,
	// 	GetAssociatedGroups,
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

export const setProponentPermissions = async (UUID, groupId) => {
    console.log('setProponentPermissions state :>> GetRoleDefinitions')
    const roles = await GetRoleDefinitions({})
    console.log('setProponentPermissions state :>> AddPermissionsToSite')
    await AddPermissionsToSite({
        principalId: groupId,
        roleDefId: roles['Read'].Id,
    })
    console.log('setProponentPermissions state :>> AddPermissionsToSite')
    await AddPermissionsToList({
        listName: UUID,
        principalId: groupId,
        roleDefId: roles['Contribute'].Id,
    })
    console.log('setProponentPermissions state :>> AddPermissionsToSite')
    await AddPermissionsToList({
        listName: `${UUID}_Questions`,
        principalId: groupId,
        roleDefId: roles['Contribute'].Id,
    })
    console.log('setProponentPermissions state :>> AddPermissionsToSite')
    await AddPermissionsToList({
        listName: 'ActivityLog',
        principalId: groupId,
        roleDefId: roles['Read with Add'].Id,
    })
}
