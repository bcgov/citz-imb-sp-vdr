import { RestCall } from '../RestCall/RestCall'

export const AddPermissionsToItem = async (
    listName,
    { principalId, roleDefId, itemId }
) => {
    let endPoint = `/_api/web/Lists/getByTitle('${listName}')/items(${itemId})/RoleAssignments/addRoleAssignment(principalid=${principalId},roledefid=${roleDefId})`

    const response = await RestCall({
        endPoint,
        method: 'post',
    })

    return response.d
}
