import { useEffect, useState } from 'react'
import { useList_OLD } from 'components'
import { ConsoleView } from 'react-device-detect'

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
	} = useList_OLD('Config')

	useEffect(() => {
		if (!listIsLoading) {
			try {
				let newObject = {}
				listItems.map((item) => {
					newObject[item.Key] = item
					return item
				})
				setItems(newObject)
			} catch (error) {
				console.error('error in useConfig. Check authentication.')
				console.error(error)
			}
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
