import {
	AddPermissionsToList,
	// 	AddPermissionsToSite,
	BreakListPermissionsInheritance,
	// 	ChangeGroupOwner,
	// 	CreateGroup,
	CreateList,
	GetRoleDefinitions,
	GetAssociatedGroups,
	// 	GetListItems,
	// 	DeleteGroup,
	RemovePermissionsFromList,
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

export const createProponentLibrary = async (props) => {
	const { currentUser, ...listProps } = props
	console.log('props :>> ', props)
	const roles = await GetRoleDefinitions({})
	const associatedGroups = await GetAssociatedGroups()
	const list = await CreateList(listProps)
	console.log(
		'createProponentLibrary state :>> BreakListPermissionsInheritance'
	)
	await BreakListPermissionsInheritance({
		listGUID: list.Id,
		copy: false,
		clear: true,
	})
	console.log('createProponentLibrary state :>> AddPermissionsToList')
	await AddPermissionsToList({
		//owners
		listGUID: list.Id,
		principalId: associatedGroups.AssociatedOwnerGroup.Id,
		roleDefId: roles['Full Control'].Id,
	})
	console.log('createProponentLibrary state :>> AddPermissionsToList')
	await AddPermissionsToList({
		//members
		listGUID: list.Id,
		principalId: associatedGroups.AssociatedMemberGroup.Id,
		roleDefId: roles['Contribute'].Id,
	})
	console.log('createProponentLibrary state :>> AddPermissionsToList')
	await AddPermissionsToList({
		//visitors
		listGUID: list.Id,
		principalId: associatedGroups.AssociatedVisitorGroup.Id,
		roleDefId: roles['Read'].Id,
	})
	console.log('createProponentLibrary state :>> RemovePermissionsFromList')
	await RemovePermissionsFromList({
		listGUID: list.Id,
		principalId: currentUser.id,
		roleDefId: roles['Full Control'].Id,
	})

	return list
}
