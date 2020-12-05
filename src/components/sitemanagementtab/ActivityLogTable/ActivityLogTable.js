import React from 'react'
import { SPList } from 'Components'

export const ActivityLogTable = () => {
	function SelectColumnFilter({
		column: { filterValue, setFilter, preFilteredRows, id },
	}) {
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

	return (
		<SPList
			listName={'ActivityLog'}
			showTitle = {false}
			refresh={true}
			customColumns={[
				{
					Filter: SelectColumnFilter,
					Footer: 'Proponent',
					Header: 'Proponent',
					accessor: 'Proponent',
					disableFilters: false,
					disableSortBy: true,
				},
				{
					Filter: SelectColumnFilter,
					Footer: 'User',
					Header: 'User',
					accessor: 'User',
					disableFilters: false,
					disableSortBy: true,
				},
			]}
		/>
	)
}
