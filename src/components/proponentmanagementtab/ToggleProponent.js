import {
	GetRoleDefinitions,
	AddPermissionsToList,
	AddPermissionsToSite,
	GetAssociatedGroups,
	UpdateListItem,
	DeleteGroup,
} from 'citz-imb-sp-utilities'

import { CreateProponentGroup } from './CreateProponentGroup/CreateProponentGroup'

export const ToggleProponent = async (proponentListName, rowdata, callBack) => {
	if (rowdata.Active) {
		const deleteProponentGroup = await DeleteGroup({
			groupId: rowdata.GroupId,
		})
		const updateProponentList = await UpdateListItem({
			listName: proponentListName,
			items: { Id: rowdata.Id, Active: false, GroupId: 0 },
		})
	} else {
		const associatedGroups = await GetAssociatedGroups()
		const roles = await GetRoleDefinitions({})
		const group = await CreateProponentGroup({
			groupName: rowdata.UUID,
			associatedGroups: associatedGroups,
		})

		const updateProponentList = await UpdateListItem({
			listName: proponentListName,
			items: {
				Id: rowdata.Id,
				Active: true,
				GroupId: group.Id,
			},
		})

		const addProponentToSite = await AddPermissionsToSite({
			principalId: group.Id,
			roleDefId: roles['Read'].Id,
		})
		const addProponentToProponentLibrary = await AddPermissionsToList({
			listName: rowdata.UUID,
			principalId: group.Id,
			roleDefId: roles['Contribute'].Id,
		})
		const addProponentToProponentQuestionList = await AddPermissionsToList({
			listName: `${rowdata.UUID}_Questions`,
			principalId: group.Id,
			roleDefId: roles['Contribute'].Id,
		})
	}
	callBack()
}
