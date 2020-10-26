import React, { useReducer, useEffect } from 'react'
import MaterialTable from 'material-table'
import { GetListAndItems, icons } from 'Components'

const paginationSize = 20

export const SPTable = ({
	listName,
	addItem = true,
	deleteItem = true,
	editItem = true,
	changeItemPermissions = true,
	customActions,
	onClickCallback = (action, event, rowdata) => {
		console.info(`default onClickCallback on action ${action}`)
	},
	refresh = false,
	tableTitle,
	additionalData = (list) => {
		return list
	},
	options,
}) => {
	const tableInitialState = {
		isLoading: true,
		items: [],
		columns: [],
		title: '',
		actions: [],
		listName: '',
		options: {
			search: false,
			sorting: false,
			paging: false,
			emptyRowsWhenPaging: false,
			pageSize: paginationSize,
			draggable: false,
			actionsColumnIndex: -1,
			cellStyle: {
				padding: '4px',
			},
		},
	}

	const defaultActions = {
		addItem: {
			icon: icons.Add,
			tooltip: 'Add Item',
			isFreeAction: true,
			onClick: (event, rowdata) => {
				onClickCallback('addItem', event, rowdata)
			},
		},
		editItem: {
			icon: icons.Edit,
			tooltip: 'Edit Item',
			onClick: (event, rowdata) => {
				onClickCallback('editItem', event, rowdata)
			},
		},
		deleteItem: {
			icon: icons.Delete,
			tooltip: 'Delete Item',
			onClick: (event, rowdata) => {
				onClickCallback('deleteItem', event, rowdata)
			},
		},
		changeItemPermissions: {
			icon: icons.People,
			tooltip: 'Change Item Permissions',
			onClick: (event, rowdata) => {
				onClickCallback('changeItemPermissions', event, rowdata)
			},
		},
	}

	const tableReducer = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				let newState = {}
				if (action.items.length > paginationSize) {
					newState = {
						...state,
						isLoading: false,
						items: action.items,
						columns: action.columns,
						title: action.title,
						options: {
							...state.options,
							paging: true
						}
					}
				} else {
					newState = {
						...state,
						isLoading: false,
						items: action.items,
						columns: action.columns,
						title: action.title,
					}
				}

				return newState
			case 'FETCH_ERROR':
				console.error(action.error.message)
				return tableInitialState
			case 'ADD_ACTION':
				return {
					...state,
					actions: [...state.actions, action.tableAction],
				}
			case 'ADD_CUSTOM_ACTIONS':
				return {
					...state,
					actions: [...state.actions, ...action.tableAction],
				}
			case 'CUSTOM_TITLE':
				return {
					...state,
					title: action.title,
				}
			case 'CUSTOM_OPTIONS':
				return {
					...state,
					options: {
						...state.options,
						...action.options,
					},
				}
			default:
				return state
		}
	}

	const [tableState, tableDispatch] = useReducer(
		tableReducer,
		tableInitialState
	)

	const getListAndItems = async () => {
		try {
			const listAndItems = await GetListAndItems(listName)
			const listWithAdditions = await additionalData(listAndItems)

			tableDispatch({ type: 'FETCH_SUCCESS', ...listWithAdditions })
			if (tableTitle)
				tableDispatch({ type: 'CUSTOM_TITLE', title: tableTitle })
		} catch (error) {
			tableDispatch({ type: 'FETCH_ERROR', error })
		}
	}

	useEffect(() => {
		getListAndItems()

		return () => {}
	}, [refresh])

	useEffect(() => {
		if (addItem)
			tableDispatch({
				type: 'ADD_ACTION',
				tableAction: defaultActions.addItem,
			})

		if (editItem)
			tableDispatch({
				type: 'ADD_ACTION',
				tableAction: defaultActions.editItem,
			})

		if (deleteItem)
			tableDispatch({
				type: 'ADD_ACTION',
				tableAction: defaultActions.deleteItem,
			})

		if (changeItemPermissions)
			tableDispatch({
				type: 'ADD_ACTION',
				tableAction: defaultActions.changeItemPermissions,
			})

		if (customActions)
			tableDispatch({
				type: 'ADD_CUSTOM_ACTIONS',
				tableAction: customActions,
			})

		if (options)
			tableDispatch({
				type: 'CUSTOM_OPTIONS',
				options: options,
			})

		return () => {}
	}, [])

	return (
		<MaterialTable
			actions={tableState.actions}
			columns={tableState.columns}
			data={tableState.items}
			isLoading={tableState.isLoading}
			options={tableState.options}
			title={tableState.title}
			icons={icons}
		/>
	)
}
