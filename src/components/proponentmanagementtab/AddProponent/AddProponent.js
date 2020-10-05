import {
	GetRoleDefinitions,
	AddPermissionsToSite,
	GetAssociatedGroups,
	AddItemsToList,
	GetCurrentUser,
} from 'citz-imb-sp-utilities'
import { MakeUniqueID, AddPermissionsToActivityLog } from 'Components'
import { CreateProponentGroup } from '../CreateProponentGroup/CreateProponentGroup'
import { CreateProponentLibrary } from './CreateProponentLibrary/CreateProponentLibrary'
import { CreateProponentQuestionList } from './CreateProponentQuestionList/CreateProponentQuestionList'

export const AddProponent = async (name, roles) => {
	const uniqueId = MakeUniqueID()

	const currentUser = await GetCurrentUser({})
	const associatedGroups = await GetAssociatedGroups()


	const group = await CreateProponentGroup({
		groupName: uniqueId,
		associatedGroups: associatedGroups,
	})

	const proponentLibrary = await CreateProponentLibrary({
		listName: uniqueId,
		associatedGroups: associatedGroups,
		roles: roles,
		group: group,
		currentUser: currentUser.Id,
	})

	const proponentQuestionList = await CreateProponentQuestionList({
		listName: `${uniqueId}_Questions`,
		associatedGroups: associatedGroups,
		roles: roles,
		group: group,
		currentUser: currentUser.Id,
	})

	let proponents = await AddItemsToList({
		listName: 'Proponents',
		items: {
			Title: name,
			UUID: uniqueId,
			GroupId: group.Id,
		},
	})

	let sitePermissions = await AddPermissionsToSite({
		principalId: group.Id,
		roleDefId: roles['Read'].Id,
	})

	let ActivityLogPermissions = await AddPermissionsToActivityLog(group, roles)

	return uniqueId
}
