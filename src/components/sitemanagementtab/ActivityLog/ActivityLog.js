import React from 'react'
import { useList_OLD } from 'components'
import { LinearProgress } from '@material-ui/core'

export const ActivityLog = () => {
	const { isLoading, getRender, SelectColumnFilter } = useList_OLD(
		'ActivityLog'
	)

	const listOptions = {
		customColumns: [
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
		],
	}

	return isLoading ? <LinearProgress /> : getRender(listOptions)
}
