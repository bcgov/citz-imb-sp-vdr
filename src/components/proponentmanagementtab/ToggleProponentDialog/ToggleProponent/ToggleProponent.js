import {
	GetRoleDefinitions,
	AddPermissionsToList,
	AddPermissionsToSite,
	GetAssociatedGroups,
	UpdateListItem,
	DeleteGroup,
} from 'citz-imb-sp-utilities'

import { CreateProponentGroup,AddPermissionsToActivityLog } from 'Components'

export const ToggleProponent = async (active, groupId, proponentItemId, proponentId,enqueueSnackbar ) => {
	const proponentListName = 'Proponents'
	if (active) {
		const deleteProponentGroup = await DeleteGroup({
			groupId: groupId,
		})
		enqueueSnackbar('deleted proponent group',{variant: 'warning'})
		const updateProponentList = await UpdateListItem({
			listName: proponentListName,
			items: { Id: proponentItemId, Active: false, GroupId: 0 },
		})
		enqueueSnackbar('updated proponent list',{variant: 'warning'})
	} else {
		const associatedGroups = await GetAssociatedGroups()
		const roles = await GetRoleDefinitions({})
		const group = await CreateProponentGroup({
			groupName: proponentId,
			associatedGroups: associatedGroups,
		})
		enqueueSnackbar('created proponent group',{variant: 'warning'})

		const updateProponentList = await UpdateListItem({
			listName: proponentListName,
			items: {
				Id: proponentItemId,
				Active: true,
				GroupId: group.Id,
			},
		})
		enqueueSnackbar('updated proponent list',{variant: 'warning'})

		const addProponentToSite = await AddPermissionsToSite({
			principalId: group.Id,
			roleDefId: roles['Read'].Id,
		})

		const addProponentToProponentLibrary = await AddPermissionsToList({
			listName: proponentId,
			principalId: group.Id,
			roleDefId: roles['Contribute'].Id,
		})

		const addProponentToProponentQuestionList = await AddPermissionsToList({
			listName: `${proponentId}_Questions`,
			principalId: group.Id,
			roleDefId: roles['Contribute'].Id,
		})
		const addProponentToActivityLog = await AddPermissionsToActivityLog(group, roles)
		enqueueSnackbar('granted proponent site permissions',{variant: 'warning'})
	}
}
