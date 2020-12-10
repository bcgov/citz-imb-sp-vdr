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
			console.log('row.values[id] :>> ', row.values[id]);
			values.push(row.values[id])
		})

		console.log('values :>> ', values);

		values.forEach(async option => {
			console.log('option :>> ', option);
			const user = await GetUser({userId:option})
			console.log('user :>> ', user);
			userOptions.push({value: option, display: user.Title})
		})

		console.log('userOptions :>> ', userOptions.length);

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
