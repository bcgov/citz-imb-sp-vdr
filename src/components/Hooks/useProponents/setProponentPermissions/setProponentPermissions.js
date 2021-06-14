import {
    AddPermissionsToItem,
    AddPermissionsToList,
    AddPermissionsToSite,
    BreakItemPermissionsInheritance,
    GetRoleDefinitions,
} from 'components/Api'

export const setProponentPermissions = async (UUID, groupId, itemId) => {
    const roles = await GetRoleDefinitions({})

    await AddPermissionsToSite({
        principalId: groupId,
        roleDefId: roles['Read'].Id,
    })

    await AddPermissionsToList({
        listName: UUID,
        principalId: groupId,
        roleDefId: roles['Contribute'].Id,
    })

    await AddPermissionsToList({
        listName: `${UUID}_Questions`,
        principalId: groupId,
        roleDefId: roles['Contribute'].Id,
    })

    await AddPermissionsToList({
        listName: 'ActivityLog',
        principalId: groupId,
        roleDefId: roles['Read with Add'].Id,
    })

    await BreakItemPermissionsInheritance('Proponents', { itemId })

    await AddPermissionsToItem('Proponents', {
        principalId: groupId,
        roleDefId: roles['Read'].Id,
        itemId,
    })
}
