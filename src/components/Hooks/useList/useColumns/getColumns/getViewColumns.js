import { Link } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { ColumnFilter, SelectUserColumnFilter } from 'components/Reusable'
import { User } from '../../User/User'

export const getViewColumns = (props) => {
  if (!props) return []
  const { CurrentView, Fields } = props
  const fields = Fields.results
  const viewColumns = CurrentView.ViewFields.Items.results

  return viewColumns.map((column) => {
    const viewField = fields.filter((field) => field.InternalName === column)[0]
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
          newColumn.Header = viewField.Title
          newColumn.Footer = viewField.Title
          newColumn.accessor = viewField.InternalName
          newColumn.disableFilters = false
          newColumn.disableSortBy = false
          newColumn.sortType = (rowA, rowB) => {
            const nameA = rowA.original.File.Name.toLowerCase()
            const nameB = rowB.original.File.Name.toLowerCase()
            if (nameA > nameB) return 1
            if (nameA < nameB) return -1
          }
          newColumn.filter = (rows, columnIds, filterValue) => {
            const filteredRows = rows.filter((row) =>
              row.original.File.Name.toLowerCase().includes(
                filterValue.toLowerCase()
              )
            )

            return filteredRows
          }
          newColumn.Cell = ({ row }) => {
            return (
              <Link href={row.original.File?.ServerRelativeUrl}>
                {row.original.File?.Name ?? ''}
              </Link>
            )
          }
        }
        break
      case 20: //User
        newColumn.Header = viewField.Title
        newColumn.Footer = viewField.Title
        newColumn.accessor = `${viewField.InternalName}Id`
        newColumn.Cell = ({ value }) => {
          return <User userId={value} />
        }
        newColumn.disableFilters = false
        newColumn.Filter = SelectUserColumnFilter
        break

      default:
      //! no code
    }
    return newColumn
  })
}
