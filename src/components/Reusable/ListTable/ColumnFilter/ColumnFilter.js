import React from 'react'
import { Input } from '@material-ui/core'

export const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column
	return (
		<Input
			placeholder={'filter column'}
			color={'primary'}
			value={filterValue || ''}
			onChange={(e) => setFilter(e.target.value)}
		/>
	)
}
