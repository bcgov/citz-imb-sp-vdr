import React, { Fragment, useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useList } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SPTable } from '../SPTable'
import { FormikDialog } from 'Components'

export const SPList = (props) => {
	const { listName } = props

	const { items, list, isLoading, isError} = useList({listName})
	const [formOpen, setFormOpen] = useState(false)
	const [dialogContent, setDialogContent] = useState(null)

    console.log(`${listName} :>> `, { items, list, isLoading, isError});
	const data = useMemo(() => {
		if (isLoading || isError) {
			return []
		}
		return items.data
	}, [isLoading, isError])

	const columns = useMemo(() => {
		if (isLoading || isError) {
			return []
		}
		return list.data.Columns
	}, [isLoading, isError])

	const initialState = []
	const columnFiltering = false

	const table = useTable(
		{ columns, data, initialState },
		useFilters,
		useSortBy,
		usePagination
	)

	const handleFormSubmit = async (values, { setSubmitting }) => {
		setSubmitting(false)
		handleFormClose()
	}

	const handleFormClose = () => {
		setDialogContent(null)
		setFormOpen(false)
	}

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
	return (
		<Fragment>
			<SPTable
				table={table}
				listName={listName}
				columns={columns}
				columnFiltering={columnFiltering}
			/>
			<FormikDialog
				open={formOpen}
				onSubmit={handleFormSubmit}
				close={handleFormClose}
				title={`Upload to ${listName}`}
				dialogContent={dialogContent}>
			</FormikDialog>
		</Fragment>
	)
}
