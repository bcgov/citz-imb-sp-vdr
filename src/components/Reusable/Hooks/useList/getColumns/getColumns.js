import React from 'react'
import moment from 'moment'

import { ColumnFilter } from '../ColumnFilter/ColumnFilter'
import { SelectUserColumnFilter } from '../SelectUserColumnFilter/SelectUserColumnFilter'
import { User } from '../User/User'

export const getColumns = (props) => {
	const { CurrentView, Fields } = props
	const fields = Fields.results
	const viewColumns = CurrentView.ViewFields.Items.results

	return viewColumns.map((column) => {
		const viewField = fields.filter((field) => field.Title === column)[0]
		let newColumn = {
			Header: viewField.Title,
			Footer: viewField.Title,
			accessor: viewField.InternalName,
			Filter: ColumnFilter,
			disableFilters: true,
			disableSortBy: true,
		}

		switch (viewField.FieldTypeKind) {
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
				if (viewField.EntityPropertyName !== 'DocIcon') {
					newColumn.Header = Fields.Title.Title
					newColumn.Footer = Fields.Title.Title
					newColumn.accessor = Fields.Title.InternalName
					newColumn.disableFilters = false
				}
				break
			case 20: //User
				newColumn.Header = viewField.Title
				newColumn.Footer = viewField.Title
				newColumn.accessor = `${viewField.InternalName}Id`
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
