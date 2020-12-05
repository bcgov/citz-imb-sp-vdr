import React from 'react'
import { useList } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const Library = (props) => {
	const { UUID } = props

	const libraryOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const { isLoading, getRender } = useList(UUID)

	return isLoading ? <LinearProgress /> : getRender(libraryOptions)
}
