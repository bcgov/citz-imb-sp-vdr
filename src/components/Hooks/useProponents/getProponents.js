import { GetGroup, GetListItems } from 'components/Api'

export const getProponents = async () => {
  const listName = 'Proponents'

  const items = await GetListItems({ listName })

  for (let i = 0; i < items.length; i++) {
    const group = await GetGroup(items[i].GroupId, {expand:'Users', select: 'Users'})

    items[i].Users = group.Users.results
  }

  return items
}
