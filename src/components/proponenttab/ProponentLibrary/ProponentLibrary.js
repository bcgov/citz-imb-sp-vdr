import React, { useContext } from 'react'
import { useList_OLD, UserContext } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export const ProponentLibrary = () => {
	const currentUser = useContext(UserContext)

	const libraryOptions = {
		listName: currentUser.proponent,
		tableTitle: 'Submitted Documents',
		// columnFiltering: false,
		//showTitle: false,
	}

	const { isLoading, getRender } = useList_OLD(currentUser.proponent)

	return currentUser.proponent === 'not a proponent' ? (
		<Alert severity={'info'}>User is not a proponent</Alert>
	) : isLoading ? (
		<LinearProgress />
	) : (
		getRender(libraryOptions)
	)
}
