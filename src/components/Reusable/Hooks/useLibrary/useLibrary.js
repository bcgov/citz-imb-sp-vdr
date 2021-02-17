import React, { useState, useEffect, useMemo } from 'react'
import { GetLibrary, GetDocuments } from './Api'
import {
	GetList,
	GetListItems,
	AddDocument,
	UpdateListItem,
} from 'citz-imb-sp-utilities'
import { ProcessFile } from './ProcessFile/ProcessFile'
// import { ColumnFilter } from './ColumnFilter/ColumnFilter'
// import { SelectColumnFilter } from './SelectColumnFilter/SelectColumnFilter.js'
// import { SelectUserColumnFilter } from './SelectUserColumnFilter/SelectUserColumnFilter'
import * as Yup from 'yup'
// import { User } from './User/User'

import { useQuery, useMutation, useQueryClient } from 'react-query'

export const useLibrary = (listName, options = {}) => {
	const library = useQuery([listName, 'list'], () =>
		GetLibrary({ listName, options })
	)

	const documents = useQuery([listName, 'items'], () =>
		GetDocuments(listName)
	)

	const queryClient = useQueryClient()

	const {
		mutateAsync: addMutation,
		isLoading: isAddMutating,
	} = useMutation((payload) => AddDocument({ listName, payload }))

	const getFileBuffer = () => {}

	const addDocuments = async (files) => {
		let fileData = files[0]
		console.log('fileData :>> ', fileData)

		// const fileContents = await ProcessFile(fileData)

		const fileReader = new FileReader()

		const addDocs = async ({ fileData, fileContents }) => {
			await addMutation({ fileData, fileContents })
			queryClient.invalidateQueries([listName, 'items'])
		}

		fileReader.onload = () => {
			console.log('fileReader.result', fileReader.result)
			const fileContents = fileReader.result

			console.log('fileContents :>> ', fileContents)
			addDocs({ fileData, fileContents })
		}

		fileReader.readAsArrayBuffer(fileData)
	}

	// =============================
	const { listView } = options

	const [title, setTitle] = useState('')
	const [fields, setFields] = useState([])
	const [views, setViews] = useState([])
	const [currentView, setCurrentView] = useState()
	const [columns, setColumns] = useState([])
	const [addColumns, setAddColumns] = useState([])
	// const [items, setItems] = useState()
	// const [isLoading, setIsLoading] = useState(true)

	const getList = async (listName) => {
		try {
			let list = await GetList({
				listName: listName,
				expand:
					'DefaultView,DefaultView/ViewFields,Views,Views/ViewFields,Fields',
			})

			let _items = await GetListItems({ listGUID: list.Id })

			setTitle(list.Title)

			let fieldObject = {}
			let _addColumns = []

			list.Fields.results.map((field) => {
				if (!field.ReadOnlyField) {
					let columnObj = {
						name: field.InternalName,
						label: field.Title,
						initialValue: field.DefaultView,
					}

					switch (field.FieldTypeKind) {
						case 2: //text Specifies that the field contains a single line of text.
							columnObj.control = 'input'

							if (field.required) {
								columnObj.required = true
								columnObj.validationSchema = Yup.string().required(
									'Required'
								)
							} else {
								columnObj.validationSchema = Yup.string()
							}

							break
						case 1: //integer Specifies that the field contains an integer value.
						case 3: //note Specifies that the field contains multiple lines of text.
						case 4: //dateTime Specifies that the field contains a date and time value or a date-only value.
						case 5: //counter Specifies that the field contains a monotonically increasing integer.
						case 6: //choice Specifies that the field contains a single value from a set of specified values.
						case 7: //lookup Specifies that the field is a lookup field.
						case 8: //boolean Specifies that the field contains a Boolean value.
						case 9: //number Specifies that the field contains a floating-point number value.
						case 10: //currency Specifies that the field contains a currency value.
						case 11: //URL Specifies that the field contains a URI and an optional description of the URI.
						case 12: //computed Specifies that the field is a computed field.
						case 13: //threading Specifies that the field indicates the thread for a discussion item in a threaded view of a discussion board.
						case 14: //guid Specifies that the field contains a GUID value.
						case 15: //multiChoice Specifies that the field contains one or more values from a set of specified values.
						case 16: //gridChoice Specifies that the field contains rating scale values for a survey list.
						case 17: //calculated Specifies that the field is a calculated field.
						case 18: //file Specifies that the field contains the leaf name of a document as a value.
						case 19: //attachments Specifies that the field indicates whether the list item has attachments.
						case 20: //user Specifies that the field contains one or more users and groups as values.
						case 21: //recurrence Specifies that the field indicates whether a meeting in a calendar list recurs.
						case 22: //crossProjectLink Specifies that the field contains a link between projects in a Meeting Workspace site.
						case 23: //modStat Specifies that the field indicates moderation status.
						case 24: //error Specifies that the type of the field was set to an invalid value.
						case 25: //contentTypeId Specifies that the field contains a content type identifier as a value.
						case 26: //pageSeparator Specifies that the field separates questions in a survey list onto multiple pages.
						case 27: //threadIndex Specifies that the field indicates the position of a discussion item in a threaded view of a discussion board.
						case 28: //workflowStatus Specifies that the field indicates the status of a workflow instance on a list item.
						case 29: // allDayEvent Specifies that the field indicates whether a meeting in a calendar list is an all-day event.
						case 30: //workflowEventType Specifies that the field contains the most recent event in a workflow instance.
						case 31: //geolocation Specifies that the field contains geographical location values.
						default:
						// console.log(
						// 	`${field.FieldTypeKind} ${field.Title} :>> `,
						// 	field
						// )
					}
					_addColumns.push(columnObj)
				}

				fieldObject[field.InternalName] = field
				return field
			})

			setFields(fieldObject)
			setAddColumns(_addColumns)
			setViews(list.Views.results)
			if (!listView) changeView(list.DefaultView)
			// setItems(_items)
		} catch (error) {
			console.error('error in getting list', error)
		}
	}

	const changeView = (view) => {
		if (typeof view === 'string') {
			for (let i = 0; i < views.length; i++) {
				if (views[i].Title === view) {
					setCurrentView(views[i])
					break
				}
			}
			return
		}
		setCurrentView(view)
	}

	const updateItem = async (updateItems) => {
		console.log('updateItems :>> ', updateItems)
		try {
			await UpdateListItem({ listName, items: updateItems })
		} catch (error) {
			console.error('useList updateItem error:', error)
			return error
		}
	}

	const getItemById = (id) => {
		return documents.find((item) => item.Id === id)
	}

	return {
		items: documents,
		list: library,
		isLoading: documents.isLoading
			? true
			: library.isLoading
			? true
			: isAddMutating
			? true
			: false,
		isError: documents.isError ? true : library.isError ? true : false,
		addDocuments,
		//========================
		// addColumns,
		// changeView,
		// columns,
		// fields,
		// render,
		// getItemById,
		// items,
		// refresh,
		// SelectColumnFilter,
		// title,
		// updateItem,
		// views,
	}
}
