import { RestCall } from '../RestCall/RestCall'

export const GetGroupMembers = async ({ groupId, groupName }) => {
  let endPoint

  if (!groupId) {
    if (!groupName) {
      return Promise.reject('GetGroupMembers requires groupId or groupName')
    } else {
      endPoint = `/_api/web/SiteGroups/getByName('${groupName}')/Users`
    }
  } else if (groupId === 0) {
    return []
  } else {
    endPoint = `/_api/web/SiteGroups(${groupId})/Users`
  }

  const response = await RestCall({ endPoint: endPoint })

  return response.d.results
}
