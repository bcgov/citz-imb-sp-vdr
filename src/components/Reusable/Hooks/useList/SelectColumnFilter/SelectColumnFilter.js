import React from 'react'

export const SelectColumnFilter = (props) => {
	const {
		column: { filterValue, setFilter, preFilteredRows, id },
	} = props
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = React.useMemo(() => {
		const options = new Set()
		preFilteredRows.forEach((row) => {
			options.add(row.values[id])
		})
		return [...options.values()]
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
