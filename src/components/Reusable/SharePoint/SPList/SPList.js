import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { useList, FormikDialog } from 'Components'
import {
	IconButton,
	LinearProgress,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableSortLabel,
	TablePagination,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { SPTable } from '../SPTable/SPTable'

//TODO: allow changes to a different view
//TODO: CRUD operations
//TODO: addRecord is incomplete!
//TODO: global filter

export const SPList = (props) => {
	const {
		listName,
		columnFiltering = true,
		tableTitle,
		showTitle = true,
		initialState = {},
		addRecord = false,
		// deleteItem = false,
		// editItem = false,
		// changeItemPermissions = false,
		refresh = true,
		customColumns = [],
		customActions = [],
		columns,
		items,
		title,
		addColumns,
		isLoading,
	} = props

	const [dialog, setDialog] = useState({ open: false })
	const [freeActions, setFreeActions] = useState([])
	const [rowActions, setRowActions] = useState([])
	const [tableOptions, setTableOptions] = useState()

	const tableColumns = useMemo(() => {
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
	}, columns)

	// const {
	// 	title,
	// 	columns,
	// 	items,
	// 	// addItem,
	// 	addColumns,
	// 	refresh: refreshData,
	// 	isLoading: listIsLoading,
	// } = useList(listName)

	const addItemDialog = () => {
		setDialog({
			fields: addColumns,
			onSubmit: (values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			},
			open: true,
			close: () => {
				setDialog({ open: false })
			},
			title: '',
			instructions: '',
			fullWidth: true,
		})
	}

	// useEffect(() => {
	// 	let _freeActions = []
	// 	let _rowActions = []

	// 	for (let i = 0; i < customActions.length; i++) {
	// 		if (customActions[i].isFreeAction) {
	// 			_freeActions.push(customActions[i])
	// 		} else {
	// 			_rowActions.push(customActions[i])
	// 		}
	// 	}

	// 	setFreeActions(_freeActions)
	// 	setRowActions(_rowActions)
	// 	return () => {}
	// }, [])

	// useEffect(() => {
	// 	refreshData()
	// 	return () => {}
	// }, [refresh])

	// useEffect(() => {
	// 	if (!listIsLoading) setIsLoading(false)
	// 	return () => {}
	// }, [listIsLoading])

	useEffect(() => {
		if (!isLoading) {
			setFreeActions(
				customActions.map((action) => {
					if (action.isFreeAction) return action
				})
			)

			setTableOptions({
				items,
				initialState,
				columnFiltering,
			})
		}



		return () => {}
	}, [isLoading])

	return (
		<Fragment>
			<TableContainer>
				<div>
					{showTitle ? (
						<h2>{tableTitle ? tableTitle : title}</h2>
					) : null}
					{addRecord ? (
						<IconButton
							aria-label='add'
							color={'primary'}
							onClick={addItemDialog}>
							<AddIcon />
						</IconButton>
					) : null}
					{freeActions.map((action, index) => {
						return (
							<span key={`${listName}_freeActions_${index}`}>
								{action.render}
							</span>
						)
					})}
				</div>
				<SPTable columns={tableColumns} {...tableOptions} />
			</TableContainer>
			<FormikDialog {...dialog} />
		</Fragment>
	)
}