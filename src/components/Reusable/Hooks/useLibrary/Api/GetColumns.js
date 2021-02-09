import React from 'react'
import { Link } from '@material-ui/core'
import moment from 'moment'

export const GetColumns = (list) => {
	const viewFields = list.CurrentView.ViewFields.Items.results
	const listFields = list.Fields.results

	list.Columns = viewFields.map((field) => {
		let newColumn

		for (let i = 0; i < listFields.length; i++) {
			if (listFields[i].InternalName === field) {
				newColumn = {
					Header: listFields[i].Title,
					Footer: listFields[i].Title,
					accessor: listFields[i].InternalName,
					// Filter: ColumnFilter,
					disableFilters: true,
					disableSortBy: true,
				}
				console.log(
					'listFields[i].FieldTypeKind :>> ',
					listFields[i].FieldTypeKind
				)
				switch (listFields[i].FieldTypeKind) {
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
					case 12: //LinkFilenameNoMenu
						if (listFields[i].EntityPropertyName !== 'DocIcon') {
							newColumn.Header = listFields[i].Title
							newColumn.Footer = listFields[i].Title
							newColumn.accessor = listFields[i].InternalName
							newColumn.disableFilters = false
							newColumn.Cell = ({row}) => {
								console.log('row.original.FieldValuesAsHtml.OData__x005f_dlc_x005f_DocIdUrl :>> ', row.original.FieldValuesAsHtml.OData__x005f_dlc_x005f_DocIdUrl);
								return (
									<Link
										href={
											row.original.FieldValuesAsHtml.OData__x005f_dlc_x005f_DocIdUrl
										}>
										{
											row.original.FieldValuesAsHtml
												.FileLeafRef
										}
									</Link>
								)
							}
						}
						break
					case 20: //User
						newColumn.Header = listFields[i].Title
						newColumn.Footer = listFields[i].Title
						newColumn.accessor = `${listFields[i].InternalName}Id`
						// newColumn.Cell = ({ value }) => <User userId={value} />
						newColumn.disableFilters = false
						// newColumn.Filter = SelectUserColumnFilter
						break

					default:
					// console.log(
					// 	`fields[${column}].FieldTypeKind=${fields[column].FieldTypeKind}`,
					// 	fields[column]
					// )
				}
			}
		}

		return newColumn
	})

	return list
}
