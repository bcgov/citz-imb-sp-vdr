import React from 'react'
import { useList } from 'components'
import { LinearProgress } from '@material-ui/core'

export const ActivityLog = () => {
	const { isLoading, getRender, SelectColumnFilter } = useList(
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
