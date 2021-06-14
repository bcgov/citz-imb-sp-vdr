import { RestCall } from '../RestCall/RestCall'

export const BreakItemPermissionsInheritance = async (
    listName,
    options = {}
) => {
    const { itemId, copy = true, clear = false } = options
    const endPoint = `/_api/web/Lists/getByTitle('${listName}')/items(${itemId})/breakroleinheritance(copyRoleAssignments=${copy},clearSubscopes=${clear})`

    const response = await RestCall({
        endPoint,
        method: 'post',
    })

    return response.d
}
