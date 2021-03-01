import React, { useState, useEffect, useMemo } from 'react'
import {
	GetListItems,
	AddItemsToList,
	UpdateListItem,
} from 'citz-imb-sp-utilities'
import { SPList_OLD } from 'components'
import * as Yup from 'yup'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getList } from './getList/getList'
import { getColumns } from './getColumns/getColumns'

export const useList = (props) => {
	const { listName, listView } = props

	const listQueryName = [listName, 'list']
	const itemsQueryName = [listName, 'items']

	const list = useQuery(listQueryName, () => getList(listName))
	const items = useQuery(itemsQueryName, () => GetListItems(listName))

	console.log('items :>> ', items)

	const getCurrentViewColumns = () => {
		if (list.isLoading || list.isError) return []
		return getColumns(list.data)
	}

	//=================================

	// const items = useQuery(itemsQueryName, () => GetListItems({ listGUID: list.Id }))
	const [currentView, setCurrentView] = useState()
	const [title, setTitle] = useState('')
	const [fields, setFields] = useState([])
	const [views, setViews] = useState([])
	const [columns, setColumns] = useState([])
	const [addColumns, setAddColumns] = useState([])
	// const [items, setItems] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [isRefreshing, setIsRefreshing] = useState(true)

	const refresh = async () => {
		setIsRefreshing(true)
		setIsLoading(true)
		await getList(listName)
		setIsRefreshing(false)
	}

	const changeView = (view) => {
		if (typeof view === 'string') {
			for (let i = 0; i < views.length; i++) {
				if (views[i].Title === view) {
					setCurrentView(views[i])
					break
				}
			}
			return
		}
		setCurrentView(view)
	}

	const addItem = async (addItems) => {
		try {
			const newItem = await AddItemsToList({ listName, items: addItems })
			refresh()
			return newItem
		} catch (error) {
			console.error('useList_OLD addItem error:', error)
			return error
		}
	}

	const updateItem = async (updateItems) => {
		// console.log('updateItems :>> ', updateItems)
		try {
			await UpdateListItem({ listName, items: updateItems })
			refresh()
		} catch (error) {
			console.error('useList_OLD updateItem error:', error)
			return error
		}
	}

	const getItemById = (id) => {
		return items.find((item) => item.Id === id)
	}

	useEffect(() => {
		refresh()
		return () => {}
	}, [])

	useEffect(() => {
		// console.log('useEffect isRefreshing :>> ', isRefreshing)
		if (!isRefreshing) {
			setIsLoading(false)
		}
		return () => {}
	}, [isRefreshing])

	useEffect(() => {
		// console.log('useEffect isLoading :>> ', isLoading)
		return () => {}
	}, [isLoading])

	useEffect(() => {
		if (listView) {
			changeView(listView)
		}
		return () => {}
	}, [views])

	useEffect(() => {
		// if (currentView) setColumns(getColumns())
		return () => {}
	}, [currentView])

	return {
		list: list.data,
		columns: getCurrentViewColumns(),
		items: items.data,
		isLoading: list.isLoading ? true : false,
		isError: list.isError ? true : false,
		isMutating: false,
	}

	// return {
	// 	addColumns,
	// 	addItem,
	// 	changeView,
	// 	columns,
	// 	fields,
	// 	getRender,
	// 	getItemById,
	// 	isLoading,
	// 	items,
	// 	refresh,
	// 	SelectColumnFilter,
	// 	title,
	// 	updateItem,
	// 	views,
	// }
}
