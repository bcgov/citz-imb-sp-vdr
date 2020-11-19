import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useGroup, FormikDialog } from 'Components'
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
import * as Yup from 'yup'

//TODO: CRUD operations
//TODO: addRecord is incomplete!
//TODO: global filter

export const GroupTable = ({
	groupId,
	groupName,
	addRecord = false,
	// deleteItem = false,
	// editItem = false,
	refresh = true,
}) => {
	const [dialog, setDialog] = useState({
		fields: [],
		onSubmit: () => {},
		open: false,
		close: () => {},
		title: '',
		instructions: '',
	})
	const {
		addGroupMember,
		createGroup,
		deleteGroup,
		group,
		isLoading,
		members,
		removeGroupMember,
		updateGroup,
	} = useGroup(groupId, groupName)

	const columns = useMemo(() => {
		return [
			{
				Header: 'Title',
				accessor: 'Title',
				Filter: true,
				disableFilters: true,
			},
			{
				Header: 'E-mail',
				accessor: 'Email',
				Filter: true,
				disableFilters: true,
			},
		]
	}, [])

	const data = useMemo(() => members, [members])

	const [newMembers, setNewMembers] = useState([])

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
		{ columns, data, initialState: {} },
		useFilters,
		useSortBy,
		usePagination
	)

	const { pageIndex, pageSize } = state

	const addItemDialog = () => {
		setDialog({
			fields: [
				{
					name: 'members',
					label: 'Members',
					initialValue: '',
					validationSchema: Yup.string().required('Required'),
					control: 'peoplepicker',
					getUserInfo: (values) => {
						console.log('values', values)
						setNewMembers(values)
					},
				},
			],
			onSubmit: (values, { setSubmitting }) => {
				setSubmitting(false)
				alert(JSON.stringify(values, null, 2))
			},
			open: true,
			close: () => {
				setDialog({ open: false })
			},
			title: 'Add Member',
			instructions: '',
		})
	}

	return (
		<Fragment>
			{isLoading ? (
				<LinearProgress />
			) : (
				<TableContainer>
					<div>
						<h2>{group.Title}</h2>
						{addRecord ? (
							<IconButton
								aria-label='add'
								color={'primary'}
								onClick={addItemDialog}>
								<AddIcon />
							</IconButton>
						) : null}
					</div>
					<Table {...getTableProps()}>
						<TableHead>
							{headerGroups.map((headerGroup, index) => {
								return (
									<TableRow
										key={`group_${group.Id}_tableHeadRow_${index}`}
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

													<div>
														{column.canFilter
															? column.render(
																	'Filter'
															  )
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
											key={`group_${group.Id}_tableBodyRow_${index}`}
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
									key={`group_${group.Id}_tableBodyRow_NoRecords`}>
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
