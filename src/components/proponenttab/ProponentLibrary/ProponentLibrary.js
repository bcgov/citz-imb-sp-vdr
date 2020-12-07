import React, { useContext } from 'react'
import { useList, UserContext } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const ProponentLibrary = () => {
	const currentUser = useContext(UserContext)

	const libraryOptions = {
		listName: currentUser.proponent,
		// columnFiltering: false,
		//showTitle: false,
	}

	const { isLoading, getRender } = useList(currentUser.proponent)

	return currentUser.proponent === 'not a proponent' ? null : isLoading ? (
		<LinearProgress />
	) : (
		getRender(libraryOptions)
	)
}
