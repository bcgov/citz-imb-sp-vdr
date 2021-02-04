import { useState, useEffect, useMemo, useCallback, useReducer } from 'react'
import {
	GetList,
	GetListItems,
	AddItemsToList,
	UpdateListItem,
} from 'citz-imb-sp-utilities'

export const useListNew = (listName) => {
	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [items, setItems] = useState()

	const getItems = async () => {
		try {
			let _items = await GetListItems({ listName })
			setItems(_items)
		} catch (error) {
			console.error('error in getting list', error)
		}
	}

	useEffect(() => {
		console.log('useEffect Load :>> ', { error, isLoading, items })
		getItems()
		return () => {}
	}, [])

	useEffect(() => {
		console.log('useEffect error :>> ', error)
		return () => {}
	}, [error])

	useEffect(() => {
		console.log('useEffect isLoading :>> ', isLoading)
		return () => {}
	}, [isLoading])

	useEffect(() => {
		console.log('useEffect items :>> ', items)
		if (items) setIsLoading(false)
		return () => {}
	}, [items])

	return {items, error, isLoading }
}
