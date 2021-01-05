import { GetUser } from 'citz-imb-sp-utilities'
import React, { useState } from 'react'

export const SelectUserColumnFilter = (props) => {
	const {
		column: { filterValue, setFilter, preFilteredRows, id },
	} = props
	const [options, setOptions] = useState([])
	// Calculate the options for filtering
	// using the preFilteredRows
	React.useMemo(async () => {
		const values = []
		let userOptions = []
		preFilteredRows.forEach((row) => {
			values.push(row.values[id])
		})

		values.forEach(async option => {
			const user = await GetUser({userId:option})
			userOptions.push({value: option, display: user.Title})
		})

	}, [id, preFilteredRows])

	// Render a multi-select box
	return (
		<select
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined)
			}}>
			<option value=''>All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}
