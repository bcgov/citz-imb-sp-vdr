import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { LinearProgress, IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import { useList, FormikDialog } from 'components'

import { SPTable } from '../SPTable'

export const SPList = (props) => {
	const {
		listName,
		columnFiltering = true,
		// tableTitle,
		showTitle = true,
		initialState = {},
		addRecord = true,
		deleteItem = true,
		editItem = true,
		changeItemPermissions = true,
		// refresh = true,
		customColumns = [],
		customActions = [],
		// columns,
		// items,
		title,
		addColumns,
		additionalColumns,
		// isLoading,
	} = props

	const list = useList({ listName })

	console.log('SPList list :>> ', list)

	const [formOpen, setFormOpen] = useState(false)
	const [dialogContent, setDialogContent] = useState(null)
	// const config = useContext(ConfigContext)
	// const proponents = useContext(ProponentsContext)

	const data = useMemo(() => {
		if (list.isLoading || list.isError) {
			return []
		}
		return list.items
	}, [list.isLoading, list.isError, list.isMutating])

	const columns = useMemo(() => {
		if (list.isLoading || list.isError) return []

		let columns = [...list.columns]

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
	}, [list.isLoading, list.isError, list.isMutating])

	const table = useTable(
		{ columns, data },
		useFilters,
		useSortBy,
		usePagination
	)

	const tableActions = [
	]

	//==========================================================
	// console.log('SPList_OLD props :>> ', props);

	const [dialog, setDialog] = useState({ open: false })

	const [freeActions, setFreeActions] = useState([])
	const [rowActions, setRowActions] = useState([])
	const [tableOptions, setTableOptions] = useState()

	// const addItemDialog = () => {
	// 	setDialog({
	// 		fields: addColumns,
	// 		onSubmit: (values, { setSubmitting }) => {
	// 			setTimeout(() => {
	// 				setSubmitting(false)
	// 				alert(JSON.stringify(values, null, 2))
	// 			}, 500)
	// 		},
	// 		open: true,
	// 		close: () => {
	// 			setDialog({ open: false })
	// 		},
	// 		title: '',
	// 		instructions: '',
	// 		fullWidth: true,
	// 	})
	// }
	const handleFormSubmit = async (values, { setSubmitting }) => {
		setSubmitting(false)
		handleFormClose()
	}

	const handleFormClose = () => {
		setDialogContent(null)
		setFormOpen(false)
	}

	if (list.isLoading) return <LinearProgress />

	if (list.isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{list.list.error}
				<br />
				{list.items.error}
			</Alert>
		)
	}

	return (
		<>
			<SPTable
				table={table}
				listName={listName}
				columns={columns}
				tableActions={tableActions}
			/>
			<FormikDialog
				open={formOpen}
				onSubmit={handleFormSubmit}
				close={handleFormClose}
				title={`Upload to ${listName}`}
				dialogContent={dialogContent}
			/>
		</>
	)
}
