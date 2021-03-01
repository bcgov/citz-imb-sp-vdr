import React from 'react'
import { useList_OLD } from 'components'
import { LinearProgress } from '@material-ui/core'

export const Library = (props) => {
	const { UUID } = props

	const libraryOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const { isLoading, getRender } = useList_OLD(UUID)

	return isLoading ? <LinearProgress /> : getRender(libraryOptions)
}
