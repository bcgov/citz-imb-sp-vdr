import {
	GetListItems,
	AddItemsToList,
	UpdateListItem,
} from 'citz-imb-sp-utilities'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getList } from './getList/getList'
import { getColumns } from './getColumns/getColumns'

export const useList = (props) => {
	const { listName } = props

	const listQueryName = [listName, 'list']
	const itemsQueryName = [listName, 'items']

	const list = useQuery(listQueryName, () => getList(listName))
	const items = useQuery(itemsQueryName, () => GetListItems(listName))

	const queryClient = useQueryClient()

	const getCurrentViewColumns = () => {
		if (list.isLoading || list.isError) return []
		return getColumns(list.data)
	}

	const addItemMutation = useMutation(
		(newItem) =>
			AddItemsToList({
				listName,
				items: newItem,
			}),
		{
			onMutate: async (newItem) => {
				await queryClient.cancelQueries(itemsQueryName)

				const previousValues = queryClient.getQueryData(itemsQueryName)

				queryClient.setQueryData(itemsQueryName, (oldValues) => {
					let newValues = [...oldValues]

					newValues.push(newItem)
					return newValues
				})

				return { previousValues }
			},
			onError: (error, newItem, context) =>
				queryClient.setQueryData(
					itemsQueryName,
					context.previousValues
				),
			onSettled: () => queryClient.invalidateQueries(itemsQueryName),
		}
	)

	const updateItemMutation = useMutation(
		(updateItem) => UpdateListItem({ listName, items: updateItem }),
		{
			onMutate: async (updateItem) => {
				const previousValues = queryClient.getQueryData(itemsQueryName)

				queryClient.setQueryData(itemsQueryName, (oldValues) => {
					let newValues = [...oldValues]

					const itemIndex = newValues.findIndex(
						(item) => item.Id === updateItem.Id
					)

					newValues[itemIndex] = {
						...newValues[itemIndex],
						...updateItem,
					}

					return newValues
				})

				return () =>
					queryClient.setQueryData(itemsQueryName, previousValues)
			},
			onError: (error, values, previousValues) =>
				queryClient.setQueryData(itemsQueryName, previousValues),
			onSuccess: () => queryClient.invalidateQueries(itemsQueryName),
		}
	)

	return {
		list: list.data,
		columns: getCurrentViewColumns(),
		items: items.data,
		isLoading: list.isLoading ? true : items.isLoading ? true : false,
		isError: list.isError ? true : items.isError ? true : false,
		isMutating: addItemMutation.isLoading
			? true
			: updateItemMutation.isLoading
			? true
			: false,
		addItem: addItemMutation.mutateAsync,
		updateItem: updateItemMutation.mutateAsync,
		test: updateItemMutation,
	}
}
