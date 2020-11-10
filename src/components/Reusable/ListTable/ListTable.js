import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useList, FormikDialog } from 'Components'
import {
	Button,
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

//TODO: allow changes to a different view
//TODO: CRUD operations
//TODO: addRecord is incomplete!
//TODO: global filter

export const ListTable = ({
	listName,
	columnFiltering = true,
	tableTitle,
	initialState = {},
	addRecord = false,
	// deleteItem = false,
	// editItem = false,
	// changeItemPermissions = false,
	refresh = true,
	customColumns = [],
	customActions = [],
}) => {
	const [dialog, setDialog] = useState({
		fields: [],
		onSubmit: () => {},
		open: false,
		close: () => {},
		title: '',
		instructions: '',
	})
	const [freeActions, setFreeActions] = useState([])
	const [rowActions, setRowActions] = useState([])

	const {
		title,
		columns: tableColumns,
		items,
		addItem,
		addColumns,
		refresh: refreshData,
		isLoading,
	} = useList(listName)

	const columns = useMemo(() => {
		for (let i = 0; i < customColumns.length; i++) {
			for (let j = 0; j < tableColumns.length; j++) {
				if (customColumns[i].accessor === tableColumns[j].accessor) {
					tableColumns[j] = {
						...tableColumns[j],
						...customColumns[i],
					}
				}
			}
		}
		return [...tableColumns, ...rowActions]
	}, [tableColumns])

	const data = useMemo(() => items, [items])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		rows,
		pageOptions,
		state,
		gotoPage,
		setPageSize,
		prepareRow,
	} = useTable(
		{ columns, data, initialState },
		useFilters,
		useSortBy,
		usePagination
	)

	const { pageIndex, pageSize } = state

	const addItemDialog = () => {
		console.log('addColumns :>> ', addColumns)
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
		})
	}

	useEffect(() => {
		let _freeActions = []
		let _rowActions = []

		for (let i = 0; i < customActions.length; i++) {
			if (customActions[i].isFreeAction) {
				_freeActions.push(customActions[i])
			} else {
				_rowActions.push(customActions[i])
			}
		}

		setFreeActions(_freeActions)
		setRowActions(_rowActions)
		return () => {}
	}, [])

	useEffect(() => {
		refreshData()
		return () => {}
	}, [refresh])

	return (
		<Fragment>
			{isLoading ? (
				<LinearProgress />
			) : (
				<TableContainer>
					<div>
						<h2>{tableTitle ? tableTitle : title}</h2>
						{addRecord ? (
							<IconButton
								aria-label='add'
								color={'primary'}
								onClick={addItemDialog}>
								<AddIcon />
							</IconButton>
						) : null}
						{freeActions.map((action, index) => {
							return (<span key={`${listName}_freeActions_${index}`}>{action.render}</span>

							)
						})}
					</div>
					<Table {...getTableProps()}>
						<TableHead>
							{headerGroups.map((headerGroup, index) => {
								return (
									<TableRow
										key={`${listName}_tableHeadRow_${index}`}
										{...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => {
											return (
												<TableCell
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}>
													<div>
														{column.render(
															'Header'
														)}
														<span>
															{column.isSorted ? (
																column.isSortedDesc ? (
																	<TableSortLabel
																		direction={
																			'desc'
																		}
																	/>
																) : (
																	<TableSortLabel
																		direction={
																			'asc'
																		}
																	/>
																)
															) : (
																<TableSortLabel
																	hideSortIcon={
																		true
																	}
																/>
															)}
														</span>
													</div>
													{columnFiltering ? (
														<div>
															{column.canFilter
																? column.render(
																		'Filter'
																  )
																: null}
														</div>
													) : null}
												</TableCell>
											)
										})}
									</TableRow>
								)
							})}
						</TableHead>
						<TableBody {...getTableBodyProps()}>
							{page.length ? (
								page.map((row, index) => {
									prepareRow(row)
									return (
										<TableRow
											key={`${listName}_tableBodyRow_${index}`}
											{...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<TableCell
														{...cell.getCellProps()}>
														{cell.render('Cell')}
													</TableCell>
												)
											})}
										</TableRow>
									)
								})
							) : (
								<TableRow
									key={`${listName}_tableBodyRow_NoRecords`}>
									<TableCell colSpan={columns.length}>
										No Records Found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					{pageSize < rows.length ? (
						<TablePagination
							component='div'
							rowsPerPage={pageSize}
							count={rows.length}
							page={pageIndex}
							onChangePage={(event, newPage) => {
								gotoPage(newPage)
							}}
							labelDisplayedRows={(from, to, count) => {
								return `Page ${pageIndex + 1} of ${
									pageOptions.length
								}`
							}}
							onChangeRowsPerPage={(event) => {
								setPageSize(parseInt(event.target.value, 10))
								gotoPage(0)
							}}
						/>
					) : null}
				</TableContainer>
			)}
			<FormikDialog {...dialog} />
		</Fragment>
	)
}
