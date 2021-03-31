import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useList } from 'components';

import { SPTable } from '../SPTable';

export const SPList = (props) => {
	const {
		listName,
		initialState = {},
		customColumns = [],
		tableProps,
	} = props;

	const { items, columns, isLoading, isError, error } = useList({
		listName,
	});

	const data = useMemo(() => {
		if (isLoading || isError) {
			return [];
		}

		return items;
	}, [isLoading, isError, items]);

	const tableColumns = useMemo(() => {
		if (isLoading || isError) return [];

		let updatedColumns = columns;

		for (let i = 0; i < customColumns.length; i++) {
			let isNewColumn = true;
			for (let j = 0; j < columns.length; j++) {
				if (customColumns[i].accessor === updatedColumns[j].accessor) {
					updatedColumns[j] = {
						...updatedColumns[j],
						...customColumns[i],
					};
					isNewColumn = false;
					break;
				}
			}
			if (isNewColumn) {
				updatedColumns.push(customColumns[i]);
			}
		}
		
		return updatedColumns;
	}, [columns, customColumns, isError, isLoading]);

	const table = useTable(
		{ columns, data, initialState },
		useFilters,
		useSortBy,
		usePagination
	);

	if (isError) {
		return (
			<Alert severity='error'>
				<AlertTitle>Error</AlertTitle>
				{error}
			</Alert>
		);
	}

	return (
		<SPTable
			table={table}
			title={listName}
			columns={tableColumns}
			{...tableProps}
		/>
	);
};
