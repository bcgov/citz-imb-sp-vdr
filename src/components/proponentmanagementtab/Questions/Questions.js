import React from 'react'
import { useList } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const Questions = (props) => {
	const { UUID } = props

	const listOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const { isLoading, getRender } = useList(`${UUID}_Questions`)

	return isLoading ? <LinearProgress /> : getRender(listOptions)
}
