import { useMemo } from 'react'
import { AddItemsToList, UpdateListItem } from 'citz-imb-sp-utilities'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getList } from './getList/getList'
import { getColumns } from './getColumns/getColumns'

export const useList = (props) => {
	if (typeof props !== 'object') console.log('useList', props)
	const { listName, preRequisite } = props

	// const listQueryName = [listName, 'list']
	// const itemsQueryName = [listName, 'items']

	let queryOptions = {
		enabled: !!listName,
	}

	if (preRequisite) {
		queryOptions = {
			enabled: !!listName && !!preRequisite,
		}
	}

	const mylist = useQuery(listName, () => getList(listName), queryOptions)
	// console.log('mylist :>> ', mylist)

	const { data, isFetching, isLoading, isError, status, error } = mylist

	const { list, items } = useMemo(() => {
		if (isLoading || isError) return { list: {}, items: [] }
		return data
	}, [isFetching])

	// const items = useQuery(itemsQueryName, () => GetListItems(listName))

	const queryClient = useQueryClient()

	const columns = useMemo(() => {
		if (isLoading || isError) return []
		return getColumns(list)
	}, [isFetching])

	const addItemMutation = useMutation(
		(newItem) =>
			AddItemsToList({
				listName,
				items: newItem,
			}),
		{
			onMutate: async (newItem) => {
				await queryClient.cancelQueries(listName)

				const previousValues = queryClient.getQueryData(listName)

				queryClient.setQueryData(listName, (oldValues) => {
					console.log('oldValues :>> ', oldValues)
					let newValues = [...oldValues.items]

					newValues.push(newItem)
					return { list: oldValues.list, items: newValues }
				})

				return { previousValues }
			},
			onError: (error, newItem, context) =>
				queryClient.setQueryData(listName, context.previousValues),
			onSettled: () => queryClient.invalidateQueries(listName),
		}
	)

	const updateItemMutation = useMutation(
		(updateItem) => UpdateListItem({ listName, items: updateItem }),
		{
			onMutate: async (updateItem) => {
				const previousValues = queryClient.getQueryData(listName)

				queryClient.setQueryData(listName, (oldValues) => {
					let newValues = [...oldValues.items]

					const itemIndex = newValues.findIndex(
						(item) => item.Id === updateItem.Id
					)

					newValues[itemIndex] = {
						...newValues[itemIndex],
						...updateItem,
					}

					return { list: oldValues.list, items: newValues }
				})

				return () => queryClient.setQueryData(listName, previousValues)
			},
			onError: (error, values, previousValues) =>
				queryClient.setQueryData(listName, previousValues),
			onSuccess: () => queryClient.invalidateQueries(listName),
		}
	)

	return {
		list,
		items,
		isFetching,
		isLoading,
		isError,
		error,
		status,
		columns,
		isMutating: addItemMutation.isLoading
			? true
			: updateItemMutation.isLoading
			? true
			: false,
		addItem: addItemMutation.mutateAsync,
		updateItem: updateItemMutation.mutateAsync,
	}
}
