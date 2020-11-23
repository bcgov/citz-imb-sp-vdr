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
import { Alert, AlertTitle } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import * as Yup from 'yup'

//TODO: CRUD operations
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
		// fields: [],
		// onSubmit: () => {},
		open: false,
		// close: () => {},
		// title: '',
		// instructions: '',
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
			{
				Header: 'Remove',
				id: 'removeMember',
				Cell: ({ row  }) => {
					const clickHandler = () => {
						removeItemDialog(row)
					}

					return (
						<IconButton color={'primary'} onClick={clickHandler}>
							<DeleteOutlineIcon />
						</IconButton>
					)
				},
			},
		]
	}, [group])

	const data = useMemo(() => members, [members])

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
					//validationSchema: Yup.string().required('Required'),
					control: 'peoplepicker',
				},
			],
			onSubmit: async (values, { setSubmitting }) => {
				console.log('group', group)
				try {
					await addGroupMember(values)
					setDialog({ open: false })
				} catch (error) {
					throw error
				} finally {
					setSubmitting(false)
				}
			},
			open: true,
			close: () => {
				setDialog({ open: false })
			},
			title: 'Add Member',
		})
	}

	const removeItemDialog = ({original}) => {
		setDialog({
		dialogContent:<Alert><AlertTitle>Remove {original.Title} from Group?</AlertTitle>{original.Title} will no longer have access to this site</Alert>,
			onSubmit: async (values, { setSubmitting }) => {
				try {
					await removeGroupMember(original.Id)
					setDialog({ open: false })
				} catch (error) {
					throw error
				} finally {
					setSubmitting(false)
				}
			},
			open: true,
			close: () => {
				setDialog({ open: false })
			},
			title: 'Remove Member',
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
