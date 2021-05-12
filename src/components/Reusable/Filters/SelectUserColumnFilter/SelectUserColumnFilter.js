import { GetUser } from 'components/Api';
import React, { useCallback, useEffect, useState } from 'react';

export const SelectUserColumnFilter = (props) => {
	const {
		column: { filterValue, setFilter, preFilteredRows, id },
	} = props

	const [options, setOptions] = useState()

	const getOptions = useCallback(async () => {
		const uniqueUserIds = preFilteredRows
			.map((row) => row.values[id])
			.filter((id, index, self) => self.indexOf(id) === index)

		let userOptions = []

		for (let i = 0; i < uniqueUserIds.length; i++) {
			const user = await GetUser({ userId: uniqueUserIds[i] })
			userOptions.push(
				<option key={i} value={uniqueUserIds[i]}>
					{user.Title}
				</option>
			)
		}

		setOptions(userOptions)
	}, [preFilteredRows])

	useEffect(() => {
		getOptions()
		return () => {}
	}, [getOptions])

	return (
		<select
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined)
			}}>
			<option value=''>All</option>
			{options}
		</select>
	)
}
