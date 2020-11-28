import { useEffect, useState } from 'react'
import { useList } from 'Components'

export const useConfig = () => {
	const [items, setItems] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const {
		// addColumns,
		// addItem,
		// changeView,
		// columns,
		// fields,
		isLoading: listIsLoading,
		items: listItems,
		// refresh,
		// title,
		// updateItem,
		// views,
	} = useList('Config')

	useEffect(() => {
		if (!listIsLoading) {
			let newObject = {}
			listItems.map((item) => {
				newObject[item.Key] = item
				return item
			})
			setItems(newObject)
		}
		return () => {}
	}, [listIsLoading, listItems])

	useEffect(() => {
		if (items) {
			setIsLoading(false)
		}
		return () => {}
	}, [items])

	return { items, isLoading }
}
