import { Input } from '@material-ui/core'
import React from 'react'

export const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter, Header } = column
	return (
		<Input
			placeholder={`type here to filter by ${Header}`}
			color={'primary'}
			value={filterValue || ''}
			fullWidth={true}
			onChange={(e) => {
				e.preventDefault()
				return setFilter(e.target.value)
			}}
		/>
	)
}
