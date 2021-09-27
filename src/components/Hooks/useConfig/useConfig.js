import { useList } from 'components/Hooks'

export const useConfig = () => {
  const listName = 'Config'

  const list = useList(listName)

  const itemFilter = (valueKey) => {
    return list.items.filter((item) => item.Key === valueKey)[0]

  }

  return { ...list, itemFilter }
}
