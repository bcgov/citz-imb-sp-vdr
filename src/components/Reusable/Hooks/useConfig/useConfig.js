import { useMemo } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import {
	AddFileToFolder,
	AddItemsToList,
	GetFileBuffer,
	RemoveDocumentFromLibrary,
	UpdateListItem,
} from 'components/ApiCalls'

export const useConfig = () => {
	const listName = 'config'
	const queryClient = useQueryClient()

	const query = queryClient.getQueryData(listName)

	const data = useMemo(() => {
		if (query === undefined) return []
		return query
	}, [query])

	const updateItemMutation = useMutation(
		(updateItem) => UpdateListItem({ listName, items: updateItem }),
		{


			onSettled: async () => await queryClient.refetchQueries(listName),
		}
	)

	return { data, updateItem: updateItemMutation.mutateAsync }
}
