import { GetGroup, GetGroupMembers } from 'components/Api'

export const getGroup = async (groupId) => {
  if (groupId === 0) return { group: {}, members: [] }

  const groupInfo = await GetGroup(groupId)
  const members = await GetGroupMembers({ groupId })

  return { group: groupInfo, members }
}
