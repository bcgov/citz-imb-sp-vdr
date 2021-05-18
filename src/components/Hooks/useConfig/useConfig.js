import React, { useMemo } from 'react'
import { useList } from 'components/Hooks'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import { SPTable } from 'components/SharePoint'
import { EditItem } from './EditItem/EditItem'
import { ActivityLog } from './ActivityLog/ActivityLog'

export const useConfig = () => {
	const listName = 'Config'

	const {
		items,
		columns: viewColumns,
		isLoading,
		isError,
		updateItem,
	} = useList({
		listName,
	})

	const columns = useMemo(() => {
		if (isLoading || isError) return []

		return [
			{
				Footer: 'Edit',
				Header: 'Edit',
				Cell: ({ row }) => <EditItem row={row} updateItem={updateItem} />,
			},
			...viewColumns.filter(
				(column) => column.Header === 'Title' || column.Header === 'Key'
			),
		]
	}, [isLoading, isError, viewColumns, updateItem])

	const data = useMemo(() => {
		if (isLoading || isError) return []
		return items
	}, [items, isError, isLoading])

	const table = useTable(
		{ columns, data, initialState: { pageSize: 50 } },
		useFilters,
		useSortBy,
		usePagination
	)

	return {
		items,
		updateItem,
		isLoading,
		render: (
			<SPTable
				table={table}
				title='Site Management'
				tableActions={[<ActivityLog />]}
			/>
		),
	}
}
