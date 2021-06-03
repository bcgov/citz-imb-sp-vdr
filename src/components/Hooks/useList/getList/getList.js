import { GetList, GetListItems } from 'components/Api'

export const getList = async (listName) => {
  let list = await GetList({
    listName,
    expand: 'DefaultView,DefaultView/ViewFields,Views,Views/ViewFields,Fields',
  })

  const options = {}

  if (list.BaseTemplate === 101) options.expand = 'File'

  let items = await GetListItems({ listName, ...options })
  list.CurrentView = list.DefaultView

  return {
    list,
    items,
  }
}
