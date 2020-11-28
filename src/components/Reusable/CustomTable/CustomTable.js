import React from 'react'
import {
	IconButton,
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

export const CustomTable = (props) => {
	const {
		showTitle,
		Title,
		addRecord,
		addItemCallback,
		tableDataOptions,
		columns,
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
	} = tableDataOptions

	const { pageIndex, pageSize } = state

	return (
		<TableContainer>
			<div>
				{showTitle ? <h2>{Title}</h2> : null}
				{addRecord ? (
					<IconButton
						aria-label='add'
						color={'primary'}
						onClick={addItemCallback}>
						<AddIcon />
					</IconButton>
				) : null}
			</div>
			<Table {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup, index) => {
						return (
							<TableRow
								key={`tableHeadRow_${index}`}
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

											<div>
												{column.canFilter
													? column.render('Filter')
													: null}
											</div>
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
									key={`tableBodyRow_${index}`}
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
						<TableRow key={`tableBodyRow_NoRecords`}>
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
		</TableContainer>
	)
}
