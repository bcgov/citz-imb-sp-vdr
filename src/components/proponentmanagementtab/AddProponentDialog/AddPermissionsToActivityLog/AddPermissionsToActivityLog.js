import {BreakListPermissionsInheritance,AddPermissionsToList} from 'citz-imb-sp-utilities'

export const AddPermissionsToActivityLog = async (group, roles) => {
    await BreakListPermissionsInheritance({listName:'ActivityLog'})

    await AddPermissionsToList({
		listName:'ActivityLog',
		principalId: group.Id,
		roleDefId: roles['Read with Add'].Id,
	})

    return
}
