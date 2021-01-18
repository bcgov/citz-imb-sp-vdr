import React, { useState, useEffect, useMemo } from 'react'
import {
	GetList,
	GetListItems,
	AddItemsToList,
	UpdateListItem,
} from 'citz-imb-sp-utilities'
import moment from 'moment'
import { SPList } from 'Components'
import { ColumnFilter } from './ColumnFilter/ColumnFilter'
import { SelectColumnFilter } from './SelectColumnFilter/SelectColumnFilter.js'
import { SelectUserColumnFilter } from './SelectUserColumnFilter/SelectUserColumnFilter'
import * as Yup from 'yup'
import { User } from './User/User'

export const useList = (listName) => {
	const [title, setTitle] = useState('')
	const [fields, setFields] = useState([])
	const [views, setViews] = useState([])
	const [currentView, setCurrentView] = useState()
	const [columns, setColumns] = useState([])
	const [addColumns, setAddColumns] = useState([])
	const [items, setItems] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const getColumns = () => {
		const viewColumns = currentView.ViewFields.Items.results

		return viewColumns.map((column) => {
			let newColumn = {
				Header: fields[column].Title,
				Footer: fields[column].Title,
				accessor: fields[column].InternalName,
				Filter: ColumnFilter,
				disableFilters: true,
				disableSortBy: true,
			}

			switch (fields[column].FieldTypeKind) {
				case 2: //Text
					newColumn.disableFilters = false
					break
				case 3: //Multiple lines of text
					newColumn.disableFilters = false
					break
				case 4: //DateTime
					newColumn.Cell = ({ value }) =>
						moment(value).format('MMMM Do, YYYY h:mm a')
					newColumn.disableSortBy = false
					break
				case 12: //LinkTitle
					if (fields[column].EntityPropertyName !== 'DocIcon') {
						newColumn.Header = fields.Title.Title
						newColumn.Footer = fields.Title.Title
						newColumn.accessor = fields.Title.InternalName
						newColumn.disableFilters = false
					}
					break
				case 20: //User
					newColumn.Header = fields[column].Title
					newColumn.Footer = fields[column].Title
					newColumn.accessor = `${fields[column].InternalName}Id`
					newColumn.Cell = ({ value }) => <User userId={value} />
					newColumn.disableFilters = false
					newColumn.Filter = SelectUserColumnFilter
					break

				default:
				// console.log(
				// 	`fields[${column}].FieldTypeKind=${fields[column].FieldTypeKind}`,
				// 	fields[column]
				// )
			}
			return newColumn
		})
	}

	const getList = async (listName) => {
		console.log('getList', listName)
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
			changeView(list.DefaultView)
			setItems(_items)
		} catch (error) {
			console.error('error in getting list', error)
		}
	}

	const refresh = async () => {
		setIsLoading(true)
		await getList(listName)
		setIsLoading(false)
	}

	const changeView = (view) => {
		console.log('view pending change')
		if (typeof view === 'string') {
			for (let i = 0; i < views.length; i++) {
				if (views[i].Title === view) {
					setCurrentView(views[i])
				}
			}
			return
		}
		setCurrentView(view)
	}

	const getRender = (props) => {
		console.log('rendering')
		return (
			<SPList
				listName={listName}
				columns={columns}
				items={items}
				addColumns={addColumns}
				isLoading={isLoading}
				title={title}
				{...props}
			/>
		)
	}

	const addItem = async (addItems) => {
		try {
			const newItem = await AddItemsToList({ listName, items: addItems })
			refresh()
			return newItem
		} catch (error) {
			console.error('useList addItem error:', error)
			return error
		}
	}

	const updateItem = async (updateItems) => {
		try {
			await UpdateListItem({ listName, items: updateItems })
			refresh()
		} catch (error) {
			console.error('useList updateItem error:', error)
			return error
		}
	}

	const getItemById = (id) => {
		return items.find((item) => item.Id === id)
	}

	useEffect(() => {
		refresh()
		return () => {}
	}, [])

	useEffect(() => {
		if (currentView) setColumns(getColumns())
		console.log('view changed')
		return () => {}
	}, [currentView])

	return {
		addColumns,
		addItem,
		changeView,
		columns,
		fields,
		getRender,
		getItemById,
		isLoading,
		items,
		refresh,
		SelectColumnFilter,
		title,
		updateItem,
		views,
	}
}
