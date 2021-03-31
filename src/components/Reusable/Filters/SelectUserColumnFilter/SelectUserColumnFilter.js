import React, { useState, useEffect, useCallback } from 'react';
import { GetUser } from 'components/ApiCalls';

export const SelectUserColumnFilter = (props) => {
	const {
		column: { filterValue, setFilter, preFilteredRows },
	} = props;

	const [options, setOptions] = useState();

	const getOptions = useCallback(async () => {
		const uniqueUserIds = preFilteredRows
			.map((row) => row.values.AuthorId)
			.filter((id, index, self) => self.indexOf(id) === index);

		let userOptions = [];

		for (let i = 0; i < uniqueUserIds.length; i++) {
			const user = await GetUser({ userId: uniqueUserIds[i] });
			userOptions.push(
				<option key={i} value={uniqueUserIds[i]}>
					{user.Title}
				</option>
			);
		}

		setOptions(userOptions);
	}, [preFilteredRows]);

	useEffect(() => {
		getOptions();
		return () => {};
	}, [getOptions]);

	return (
		<select
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}>
			<option value=''>All</option>
			{options}
		</select>
	);
};
