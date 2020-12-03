import React, { useState, useCallback } from 'react'
import {
	Box,
	Typography,
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
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import AddIcon from '@material-ui/icons/Add'
import { FormikDialog } from 'Components'

export const MUTable = (props) => {
	const {
		listName,
		showTitle = true,
		title,
		addRecord = false,
		addRecordCallback = () => {},
		initialState = {},
		freeActions = [],
		columnFiltering = true,

		columns = [],
		data = [],

		// deleteItem = false,
		// editItem = false,
		// changeItemPermissions = false,
		// refresh = true,
		// customColumns = [],
		// customActions = [],

		// addItem,
		// addColumns,
		// refresh: refreshData,
		// isLoading: listIsLoading,
		// rowActions,
		// addItemDialog,
	} = props

	const [dialog, setDialog] = useState({ open: false })

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

	const handleAddRecordClick = () => {
		console.log('Hello There :>> ')
		setDialog({})
		//addRecordCallback()
	}

	return (
		<TableContainer>
			<Box>
				{showTitle ? (
					<Typography variant={'h6'}>{title}</Typography>
				) : null}
				{addRecord ? (
					<IconButton
						aria-label='add'
						color={'primary'}
						onClick={handleAddRecordClick}>
						<AddIcon />
					</IconButton>
				) : null}
				{freeActions.map((action, index) => {
					return (
						<Box
							key={`${listName}_freeActions_${index}`}
							component={'span'}
							children={action.children}
						/>
					)
				})}
			</Box>
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
												{column.render('Header')}
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
															hideSortIcon={true}
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
											<TableCell {...cell.getCellProps()}>
												{cell.render('Cell')}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})
					) : (
						<TableRow key={`${listName}_tableBodyRow_NoRecords`}>
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
						return `Page ${pageIndex + 1} of ${pageOptions.length}`
					}}
					onChangeRowsPerPage={(event) => {
						setPageSize(parseInt(event.target.value, 10))
						gotoPage(0)
					}}
				/>
			) : null}
			<FormikDialog open={false} />
		</TableContainer>
	)
}
