import {
	AddPermissionsToList,
	CreateList,
	BreakListPermissionsInheritance,
	RemovePermissionsFromList,
} from 'citz-imb-sp-utilities'

export const CreateProponentLibrary = async (props) => {
	const { listName, associatedGroups, roles, group, currentUser } = props

	const library = await CreateList({ listName: listName, baseTemplate: 101 })

	const breakLibraryInheritence = await BreakListPermissionsInheritance({
		listGUID: library.Id,
		copy: false,
		clear: true,
	})

	const addOwnersToLibrary = await AddPermissionsToList({
		listGUID: library.Id,
		principalId: associatedGroups.AssociatedOwnerGroup.Id,
		roleDefId: roles['Full Control'].Id,
	})

	const addMembersToLibrary = await AddPermissionsToList({
		listGUID: library.Id,
		principalId: associatedGroups.AssociatedMemberGroup.Id,
		roleDefId: roles['Contribute'].Id,
	})

	const addVisitorsToLibrary = await AddPermissionsToList({
		listGUID: library.Id,
		principalId: associatedGroups.AssociatedVisitorGroup.Id,
		roleDefId: roles['Read'].Id,
	})

	const addProponentsToLibrary = await AddPermissionsToList({
		listGUID: library.Id,
		principalId: group.Id,
		roleDefId: roles['Read with Add'].Id,
	})

	const removeCurrentUserPermissions = await RemovePermissionsFromList({
		listGUID: library.Id,
		principalId: currentUser,
		roleDefId: roles['Full Control'].Id,
	})

	return library
}
