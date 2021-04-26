import { useList } from 'components'

export const useConfig = () => {
	const listName = 'Config'

	const config = useList({ listName })

	return {
		items: config.items,
		updateItem: config.updateItem,
		isLoading: config.isLoading,
	}
}
