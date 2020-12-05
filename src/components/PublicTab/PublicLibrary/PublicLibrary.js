import React from 'react'
import { useList } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const PublicLibrary = () => {
	const libraryOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const { isLoading, getRender } = useList('Documents')

	return isLoading ? <LinearProgress /> : getRender(libraryOptions)
}
