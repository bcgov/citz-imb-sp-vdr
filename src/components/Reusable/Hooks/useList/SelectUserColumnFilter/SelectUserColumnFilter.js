import React, { useState, useEffect } from 'react'
import { GetUser } from 'citz-imb-sp-utilities'

export const SelectUserColumnFilter = (props) => {
	const {
		column: { filterValue, setFilter, preFilteredRows, id },
	} = props

	const [options, setOptions] = useState()

	const getOptions = async () => {
		const uniqueUserIds = preFilteredRows
			.map((row) => row.values.AuthorId)
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
	}

	useEffect(() => {
		getOptions()
		return () => {}
	}, [preFilteredRows])

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
