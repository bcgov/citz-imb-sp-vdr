import { useList } from 'components/Hooks'

export const useConfig = () => {
  const listName = 'Config'

  return useList(listName)
}
