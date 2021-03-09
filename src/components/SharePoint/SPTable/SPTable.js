import React, { Fragment } from 'react'
import {
	AppBar,
	CircularProgress,
	Toolbar,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableSortLabel,
	TablePagination,
} from '@material-ui/core'
import { useList } from 'components'

export const SPTable = (props) => {
	const {
		table,
		listName,
		columnFiltering = false,
		columns,
		tableActions = [],
		title,
	} = props

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
	} = table

	const { pageIndex, pageSize } = state

	const { isFetching } = useList({ listName })

	return (
		<Fragment>
			<AppBar position={'static'}>
				<Toolbar>
					<Typography variant={'h6'} style={{ flexGrow: 1 }}>
						{title ?? listName}
					</Typography>
					{isFetching ? (
						<CircularProgress color={'secondary'} />
					) : null}
					{tableActions.map((action, index) => (
						<div key={index}>{action}</div>
					))}
				</Toolbar>
			</AppBar>
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
		</Fragment>
	)
}
