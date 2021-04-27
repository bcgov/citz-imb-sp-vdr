import React, { useMemo } from 'react'
import { useList } from 'components'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import { SPTable } from 'components/SharePoint'
import { EditItem } from './EditItem/EditItem'

export const useConfig = () => {
	const listName = 'Config'

	const {
		items,
		columns: viewColumns,
		isLoading,
		isError,
		error,
		updateItem,
	} = useList({
		listName,
	})

	const columns = useMemo(() => {
		if (isLoading || isError) return []
		console.log('viewColumns :>> ', viewColumns)
		return [
			{
				Footer: 'Edit',
				Header: 'Edit',
				Cell: ({ row }) => <EditItem row={row} />,
			},
			...viewColumns.filter((column) => column.Header === 'Title'),
		]
	}, [viewColumns, isError, isLoading])

	const table = useTable(
		{ columns, data: items },
		useFilters,
		useSortBy,
		usePagination
	)

	return {
		items,
		updateItem,
		isLoading,
		render: <SPTable table={table} title='Site Management' />,
	}
}
