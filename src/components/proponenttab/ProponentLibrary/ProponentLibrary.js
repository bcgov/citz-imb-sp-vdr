import React, { useContext } from 'react'
import { useList, useCurrentUser } from 'Components'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export const ProponentLibrary = () => {
	const currentUser = useCurrentUser()

	const libraryOptions = {
		listName: currentUser.proponent,
		tableTitle: 'Submitted Documents',
		// columnFiltering: false,
		//showTitle: false,
	}

	const { isLoading, getRender } = useList(currentUser.proponent)

	if (currentUser.isLoading || isLoading) return <LinearProgress />

	if (!currentUser.isProponent)
		return <Alert severity={'info'}>User is not a proponent</Alert>

	return getRender(libraryOptions)
}
