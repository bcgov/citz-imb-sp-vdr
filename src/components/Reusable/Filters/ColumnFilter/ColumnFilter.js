import { Input } from '@material-ui/core'
import React from 'react'

export const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column
	return (
		<Input
			placeholder={'filter column'}
			color={'primary'}
			value={filterValue || ''}
			onChange={(e) => {
				e.preventDefault()
				return setFilter(e.target.value)
			}}
		/>
	)
}
