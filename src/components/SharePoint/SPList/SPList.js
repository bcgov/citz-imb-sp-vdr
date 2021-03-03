import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { Alert, AlertTitle } from '@material-ui/lab'

import { useList } from 'components'

import { SPTable } from '../SPTable'

export const SPList = (props) => {
	const {
		listName,
		initialState = {},
		customColumns = [],
		tableProps,
	} = props

	const thisList = useList({ listName })

	const data = useMemo(() => {
		if (thisList.isLoading || thisList.isError) {
			return []
		}

		return [...thisList.items]
	}, [thisList.items])

	const columns = useMemo(() => {
		if (thisList.isLoading || thisList.isError) return []

		let columns = [...thisList.columns]

		for (let i = 0; i < customColumns.length; i++) {
			for (let j = 0; j < columns.length; j++) {
				if (customColumns[i].accessor === columns[j].accessor) {
					columns[j] = {
						...columns[j],
						...customColumns[i],
					}
				}
			}
		}

		return columns
	}, [thisList.isLoading, thisList.isError])

	const table = useTable(
		{ columns, data, initialState },
		useFilters,
		useSortBy,
		usePagination
	)

	if (thisList.isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{thisList.list.error}
				<br />
				{thisList.items.error}
			</Alert>
		)
	}

	return (
		<SPTable
			table={table}
			listName={listName}
			columns={columns}
			{...tableProps}
		/>
	)
}
