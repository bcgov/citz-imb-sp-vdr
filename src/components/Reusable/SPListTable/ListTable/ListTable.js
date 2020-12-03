import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { useList, FormikDialog } from 'Components'
import { LinearProgress } from '@material-ui/core'

import { MUTable } from '../MUTable/MUTable'

//TODO: allow changes to a different view
//TODO: CRUD operations
//TODO: addRecord is incomplete!
//TODO: global filter

export const SPListTable = (props) => {
	const {
		listName,
		// columnFiltering = true,
		// tableTitle,
		// showTitle = true,
		// initialState = {},
		// addRecord = false,
		// deleteItem = false,
		// editItem = false,
		// changeItemPermissions = false,
		// refresh = true,
		// customColumns = [],
		// customActions = [],
	} = props

	const [tableOptions, setTableOptions] = useState()

	// const [dialog, setDialog] = useState({
	// 	fields: [],
	// 	onSubmit: () => {},
	// 	open: false,
	// 	close: () => {},
	// 	title: '',
	// 	instructions: '',
	// })
	// const [freeActions, setFreeActions] = useState([])
	// const [rowActions, setRowActions] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const {
		title,
		columns,
		items,
		// addItem,
		// addColumns,
		refresh: refreshData,
		isLoading: listIsLoading,
	} = useList(listName)

	const tableColumns = useMemo(() => {
		// for (let i = 0; i < customColumns.length; i++) {
		// 	for (let j = 0; j < tableColumns.length; j++) {
		// 		if (customColumns[i].accessor === tableColumns[j].accessor) {
		// 			tableColumns[j] = {
		// 				...tableColumns[j],
		// 				...customColumns[i],
		// 			}
		// 		}
		// 	}
		// }
		// return [...tableColumns, ...rowActions]
		return [...columns]
	}, [columns])

	const data = useMemo(() => {
		const _items = items?.map((item) => {
			item.Answer = item.Answer ?? 'question under review'
			console.log('item :>> ', item);
			return item})
		return _items
	}, [items])

	// const addItemDialog = () => {
	// 	console.log('addColumns :>> ', addColumns)
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
	// 	})
	// }

	// useEffect(() => {
	// 	refreshData()
	// 	return () => {}
	// }, [refresh])

	useEffect(() => {
		if (!listIsLoading) setIsLoading(false)
		return () => {}
	}, [listIsLoading])

	useEffect(() => {
		// let _freeActions = []
		// let _rowActions = []

		// for (let i = 0; i < customActions.length; i++) {
		// 	if (customActions[i].isFreeAction) {
		// 		_freeActions.push(customActions[i])
		// 	} else {
		// 		_rowActions.push(customActions[i])
		// 	}
		// }

		// setFreeActions(_freeActions)
		// setRowActions(_rowActions)

		return () => {}
	}, [])

	useEffect(() => {
		console.log('title :>> ', title)
		console.log('columns :>> ', columns)
		console.log('data :>> ', data)

		setTableOptions({
			title: 'hello worlds',
			columns,
			data,
			addRecord: true,
			addRecordCallback: () => {
				console.log('addRecordCallback')
			},
		})
		return () => {}
	}, [title, columns, data])

	return (
		<Fragment>
			{isLoading ? <LinearProgress /> : <MUTable {...tableOptions} />}
			{/* <FormikDialog {...dialog} /> */}
		</Fragment>
	)
}
