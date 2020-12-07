import React from 'react'
import { useList } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const PublicQuestionList = () => {
	const listOptions = {
		columnFiltering: false,
		showTitle: false,
	}

	const { isLoading, getRender } = useList('Questions')

	return isLoading ? <LinearProgress /> : getRender(listOptions)
}
