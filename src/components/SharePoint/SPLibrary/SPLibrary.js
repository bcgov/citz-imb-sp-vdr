import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useLibrary } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SPTable } from '../SPTable'

export const SPLibrary = (props) => {
	const { listName } = props

	const { items, list, isLoading, isError } = useLibrary(listName)

	console.log('{items, list} :>> ', { items, list })

	const data = useMemo(() => {
		if (items.isLoading || items.isError) {
			return []
		}
		return items.data
	}, [items])

	const columns = useMemo(() => {
		if (list.isLoading || list.isError) {
			return []
		}
		return list.data.Columns
	}, [list])

	const initialState = []
	const columnFiltering = false

	const table = useTable(
		{ columns, data, initialState },
		useFilters,
		useSortBy,
		usePagination
	)

	if (isLoading) {
		return <LinearProgress />
	}

	if (isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{list.error}
				<br />
				{items.error}
			</Alert>
		)
	}
	return <SPTable table={table} listName={listName} columns={columns} columnFiltering={columnFiltering} />
}
