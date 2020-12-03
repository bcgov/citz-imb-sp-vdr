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
		showTitle,
		// initialState = {},
		addRecord,
		// deleteItem = false,
		// editItem = false,
		// changeItemPermissions = false,
		// refresh = true,
		// customColumns = [],
		// customActions = [],
	} = props

	const [tableOptions, setTableOptions] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [dialog, setDialog] = useState({ open: false })

	// const [freeActions, setFreeActions] = useState([])
	// const [rowActions, setRowActions] = useState([])

	const {
		title,
		columns,
		items,
		addItem,
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

	const addRecordCallback = () => {
		console.log('addRecordCallback')
		setDialog({
			fields: {
				name: 'title',
				label: 'Title',
				initialValue: '',
				//validationSchema: Yup.string().required('Required'),
				control: 'input',
				required: true,
			},
			// onSubmit: (values, { setSubmitting }) => {
			// 	console.log('values :>> ', values);
			// 	setTimeout(() => {
			// 		setSubmitting(false)
			// 		alert(JSON.stringify(values, null, 2))
			// 	}, 500)
			// },
			open: true,
			// close: () => {setDialog({open: false})},
			// title: '',
			// instructions: '',
		})
	}

	const data = useMemo(() => {
		const _items = items?.map((item) => {
			item.Answer = item.Answer ?? 'question under review'
			console.log('item :>> ', item)
			return item
		})
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
		console.log('props :>> ', props)
		setTableOptions({
			title,
			showTitle,
			columns,
			data,
			addRecord,
		//	addRecordCallback,
		})
		return () => {}
	}, [])

	return (
		<Fragment>
			{isLoading ? <LinearProgress /> : <MUTable {...tableOptions} />}

		</Fragment>
	)
}
